from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import text_to_quiz
from app.routes import pdf_to_text
from app.routes import pdf_to_quiz
import uvicorn

app = FastAPI(title="Quizler")

origins = [
    "http://localhost:3000",
    "https://quizler-h.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_to_text.router, prefix="/api/pdf", tags=["PDF to Text"])
app.include_router(text_to_quiz.router, prefix="/api/quiz", tags=["Text To Quiz"])
app.include_router(pdf_to_quiz.router, prefix="/api/pdf", tags=["PDF to Quiz"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Agentic AI App API"}

def main():
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)