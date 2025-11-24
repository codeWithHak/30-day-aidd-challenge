from pydantic import BaseModel
from typing import List

class QuizRequest(BaseModel):
    text: str

class Question(BaseModel):
    question: str
    options: List[str]
    answer: str

class QuizResponse(BaseModel):
    questions: List[Question]