import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.app.main import app

# Vercel expects the FastAPI app instance to be available at module level
# This file serves as the entry point for Vercel deployment