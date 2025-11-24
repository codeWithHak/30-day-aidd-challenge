from fastapi import UploadFile
from pypdf import PdfReader
import io


class PDFService:
    @staticmethod
    async def extract_text(file: UploadFile) -> str:
        content = await file.read()
        file_stream = io.BytesIO(content)
        reader = PdfReader(file_stream)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
