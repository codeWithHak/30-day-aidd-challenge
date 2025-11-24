import asyncio
from openai import AsyncOpenAI
from agents import Agent, OpenAIChatCompletionsModel, Runner, set_tracing_disabled
import os
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")

#Reference: https://ai.google.dev/gemini-api/docs/openai
client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

set_tracing_disabled(disabled=True)

# Create the agent once at module level
text_summarizer_agent = Agent(
    name="Text Summarizer Agent",
    instructions="You are a helpful assistant that summarizes text and Provide a clean, meaningful and precise summary.",
    model=OpenAIChatCompletionsModel(model="gemini-2.5-flash", openai_client=client),
)

async def summarize_text(input: str) -> str:
    """
    Summarizes the given text using the text summarizer agent.
    
    Args:
        input: The text to summarize
        
    Returns:
        The summarized text
    """
    result = await Runner.run(
        text_summarizer_agent,
        input=input,
    )
    return result.final_output


async def main(input: str):
    # For CLI testing
    summary = await summarize_text(input)
    print(summary)


if __name__ == "__main__":
    asyncio.run(main("Sample text to summarize"))