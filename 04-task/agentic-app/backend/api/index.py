import os
import sys

# Get the directory of this file (backend/api)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Get the parent directory (backend)
parent_dir = os.path.dirname(current_dir)
# Get the src directory (backend/src)
src_dir = os.path.join(parent_dir, 'src')

# Add src to sys.path so we can import app
sys.path.append(src_dir)

from app.main import app

# Vercel expects the FastAPI app instance to be available at module level
# This file serves as the entry point for Vercel deployment