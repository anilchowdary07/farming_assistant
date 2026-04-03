import os
import sys

# Get the directory paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")

# Ensure backend modules are importable when running as a Vercel serverless function
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Import Flask first for fallback
from flask import Flask, jsonify

try:
    from app import app as flask_app
    app = flask_app
except Exception as e:
    print(f"Error importing app: {e}")
    import traceback
    traceback.print_exc()
    # Create a simple Flask app for error reporting
    app = Flask(__name__)
    
    @app.route('/health', methods=['GET'])
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'error',
            'error': str(e),
            'message': 'Failed to initialize application. Check GEMINI_API_KEY is set.'
        }), 500
    
    @app.route('/api/recommend', methods=['POST'])
    def recommend():
        return jsonify({
            'error': 'Application initialization failed',
            'details': str(e),
            'hint': 'Ensure GEMINI_API_KEY environment variable is set in Vercel'
        }), 500

# Export all possible names that Vercel might look for
application = app
handler = app
