import asyncio
from openai import AsyncOpenAI
from agents import Agent, OpenAIChatCompletionsModel, Runner, set_tracing_disabled
import os
from dotenv import load_dotenv

from app.schema.quiz import QuizResponse

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")

#Reference: https://ai.google.dev/gemini-api/docs/openai
client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

set_tracing_disabled(disabled=True)

# Create the agent once at module level
quiz_generator_agent = Agent(
    name="Quiz Generator Agent",
    instructions="Based on the following text, generate a quiz with 5 multiple-choice questions.",
    model=OpenAIChatCompletionsModel(model="gemini-2.5-flash", openai_client=client),
    output_type=QuizResponse
)

async def generate_quiz(input: str) -> QuizResponse:
    """
    Generates a quiz based on the given text.
    
    Args:
        input: The text to generate quiz from
        
    Returns:
        The quiz response object
    """
    result = await Runner.run(
        quiz_generator_agent,
        input=input,
    )
    return result.final_output


async def main(input: str):
    # For CLI testing
    quiz = await generate_quiz(input)
    print(quiz)


if __name__ == "__main__":
    asyncio.run(main("Sample text to summarize"))