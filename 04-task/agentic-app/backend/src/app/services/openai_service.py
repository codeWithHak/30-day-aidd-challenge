# from openai import AsyncOpenAI
# from app.core.config import get_settings
# import json

# settings = get_settings()

# class OpenAIService:
#     def __init__(self):
#         self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
#         self.model = "gpt-4o-mini"  # Or gpt-4o

#     async def get_or_create_assistant(self, name: str, instructions: str):
#         # In a real app, we would cache this ID or store it in DB
#         # For now, we'll list assistants and check, or just create a new one for the session context
#         # To avoid clutter, I'll just create one and rely on the user to clean up or use a singleton pattern in a real deployment
#         # simpler: use Chat Completions for "Agentic" behavior in a functional way
#         # But to adhere to "Agents SDK" (Assistants API), I will use it.
        
#         # For this demo, I will use Chat Completions to simulate the Agent because 
#         # managing Assistant IDs and Threads without a persistent store setup in this file 
#         # is complex. However, I can use a simple "Agent" class structure.
#         pass

#     async def summarize_text(self, text: str) -> str:
#         response = await self.client.chat.completions.create(
#             model=self.model,
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant that summarizes PDF documents. Provide a clean, meaningful summary."},
#                 {"role": "user", "content": f"Please summarize the following text:\n\n{text[:20000]}..."} # Truncate to avoid token limits for this demo
#             ],
#         )
#         return response.choices[0].message.content

#     async def generate_quiz(self, text: str) -> dict:
#         prompt = """
#         Based on the following text, generate a quiz with 5 multiple-choice questions.
#         Return the output strictly as a JSON object with the following structure:
#         {
#             "questions": [
#                 {
#                     "question": "Question text",
#                     "options": ["A", "B", "C", "D"],
#                     "answer": "Correct Option"
#                 }
#             ]
#         }
#         """
#         response = await self.client.chat.completions.create(
#             model=self.model,
#             messages=[
#                 {"role": "system", "content": "You are a quiz generator agent. You output strictly JSON."},
#                 {"role": "user", "content": f"{prompt}\n\nText:\n{text[:20000]}..."}
#             ],
#             response_format={"type": "json_object"}
#         )
#         return json.loads(response.choices[0].message.content)
