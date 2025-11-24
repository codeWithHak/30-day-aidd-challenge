from pydantic import BaseModel

class PDFResponse(BaseModel):
    filename: str
    summary: str 
    text: str