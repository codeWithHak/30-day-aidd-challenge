from fastapi import APIRouter, HTTPException, status
from app.agents.quiz_generation_agent import generate_quiz
from app.schema.quiz import QuizRequest, QuizResponse
router = APIRouter()


@router.post("/generate", response_model=QuizResponse)
async def generate_quiz_route(request: QuizRequest):
    try:
        quiz_data = await generate_quiz(request.text)
        return quiz_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )