import asyncio
import logging
from typing import Optional
from datetime import datetime
from supabase import create_client, Client
from pydantic import BaseModel
from app.schema.quiz import QuizResponse
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SupabaseService:
    def __init__(self):
        """
        Initialize the Supabase client using environment variables
        """
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")

        # Check if environment variables are properly set
        if not self.supabase_url or not self.supabase_key:
            logger.warning("SUPABASE_URL and/or SUPABASE_KEY not found in environment variables. Supabase functionality will be disabled.")
            self.client = None
            return

        try:
            self.client: Client = create_client(self.supabase_url, self.supabase_key)
            logger.info("Supabase client initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Supabase client: {str(e)}")
            self.client = None

    async def save_document(self, filename: str, original_text: str, summary: str) -> Optional[int]:
        """
        Save a document with its extracted text and generated summary to the database
        Returns the ID of the inserted document
        """
        # Check if Supabase client is initialized
        if not self.client:
            logger.warning("Supabase client not initialized, skipping save_document")
            return None

        try:
            response = self.client.table('documents').insert({
                'filename': filename,
                'original_text': original_text,
                'summary': summary,
                'created_at': datetime.now().isoformat()
            }).execute()

            if response.data:
                doc_id = response.data[0]['id']
                logger.info(f"Document saved successfully with ID: {doc_id}")
                return doc_id
            else:
                logger.error("No data returned when saving document")
                return None

        except Exception as e:
            logger.error(f"Error saving document to Supabase: {str(e)}")
            return None

    async def save_quiz_attempt(self, document_id: int, quiz_data: QuizResponse) -> Optional[int]:
        """
        Save a quiz attempt associated with a document to the database
        Returns the ID of the inserted quiz attempt
        """
        # Check if Supabase client is initialized
        if not self.client:
            logger.warning("Supabase client not initialized, skipping save_quiz_attempt")
            return None

        try:
            response = self.client.table('quiz_attempts').insert({
                'document_id': document_id,
                'quiz_data': quiz_data.model_dump() if hasattr(quiz_data, 'model_dump') else quiz_data.dict(),
                'created_at': datetime.now().isoformat()
            }).execute()

            if response.data:
                quiz_id = response.data[0]['id']
                logger.info(f"Quiz attempt saved successfully with ID: {quiz_id}")
                return quiz_id
            else:
                logger.error("No data returned when saving quiz attempt")
                return None

        except Exception as e:
            logger.error(f"Error saving quiz attempt to Supabase: {str(e)}")
            return None

    async def get_document_by_id(self, doc_id: int):
        """
        Retrieve a document by its ID
        """
        try:
            response = self.client.table('documents').select('*').eq('id', doc_id).execute()
            if response.data:
                return response.data[0]
            return None
        except Exception as e:
            logger.error(f"Error retrieving document from Supabase: {str(e)}")
            return None

    async def get_quiz_attempts_by_document_id(self, document_id: int):
        """
        Retrieve all quiz attempts for a specific document
        """
        try:
            response = self.client.table('quiz_attempts').select('*').eq('document_id', document_id).execute()
            return response.data if response.data else []
        except Exception as e:
            logger.error(f"Error retrieving quiz attempts from Supabase: {str(e)}")
            return []


# Global instance to be used throughout the application
supabase_service = SupabaseService()


"""
SQL to create the required tables in Supabase:

-- Create documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    original_text TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_attempts table
CREATE TABLE quiz_attempts (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    quiz_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_quiz_attempts_document_id ON quiz_attempts(document_id);
CREATE INDEX idx_documents_created_at ON documents(created_at);
"""