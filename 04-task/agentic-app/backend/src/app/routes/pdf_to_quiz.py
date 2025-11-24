from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.pdf_service import PDFService
from app.agents.quiz_generation_agent import generate_quiz
from app.schema.quiz import QuizResponse
from app.services.supabase_service import supabase_service

router = APIRouter()


@router.post("/generate", response_model=QuizResponse)
async def generate_quiz_from_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a PDF"
        )

    try:
        # Extract Text
        text = await PDFService.extract_text(file)

        # Generate Quiz
        quiz = await generate_quiz(text)

        # Try to save to Supabase - but don't fail if Supabase is unavailable
        try:
            # Save the source document (text and summary) to Supabase first
            doc_id = await supabase_service.save_document(file.filename, text, f"Summary of {file.filename} for quiz generation")
            if doc_id:
                # Save the quiz attempt associated with the document
                quiz_id = await supabase_service.save_quiz_attempt(doc_id, quiz)
                if quiz_id:
                    print(f"Quiz attempt saved to database with ID: {quiz_id}")
                else:
                    print("Failed to save quiz attempt to database")
            else:
                print("Failed to save document to database")
        except Exception as db_error:
            print(f"Database error (non-fatal): {str(db_error)}")

        return quiz
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
