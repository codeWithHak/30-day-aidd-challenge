import sys
import os

# Get the directory of this file (backend/)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Add the current directory to Python path so imports work correctly
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Add the src directory to Python path so 'from app...' imports work
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

# Import the FastAPI app instance
from app.main import app

# Vercel expects the app instance to handle requests
# This serves as the Vercel entry point
# Make sure the app is available at the module level
app_instance = app