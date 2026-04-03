import os
import sys

# Get the directory paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")

# Ensure backend modules are importable when running as a Vercel serverless function
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Set environment variables if not present (for local testing)
if not os.getenv('GEMINI_API_KEY'):
    print("WARNING: GEMINI_API_KEY not set")
if not os.getenv('OPENWEATHER_API_KEY'):
    print("WARNING: OPENWEATHER_API_KEY not set")

try:
    from app import app
except Exception as e:
    print(f"Error importing app: {e}")
    import traceback
    traceback.print_exc()
    # Create a simple Flask app for error reporting
    from flask import Flask, jsonify
    app = Flask(__name__)
    
    @app.route('/health', methods=['GET'])
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'error',
            'error': str(e),
            'message': 'Failed to initialize application'
        }), 500
    
    @app.route('/api/recommend', methods=['POST'])
    def recommend():
        return jsonify({
            'error': 'Application initialization failed',
            'details': str(e)
        }), 500

# Export for Vercel
handler = app
