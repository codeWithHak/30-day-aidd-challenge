from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.pdf_service import PDFService
from app.agents.text_summarizer_agent import summarize_text
from app.schema.pdf import PDFResponse
from app.services.supabase_service import supabase_service

router = APIRouter()


@router.post("/upload", response_model=PDFResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a PDF"
        )

    try:
        # Extract Text
        text = await PDFService.extract_text(file)

        # Summarize
        summary = await summarize_text(text)

        # Try to save to Supabase - but don't fail if Supabase is unavailable
        try:
            doc_id = await supabase_service.save_document(file.filename, text, summary)
            if doc_id:
                print(f"Document saved to database with ID: {doc_id}")
            else:
                print("Failed to save document to database")
        except Exception as db_error:
            print(f"Database error (non-fatal): {str(db_error)}")

        return PDFResponse(
            filename=file.filename,
            summary=summary,
            text=text
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )