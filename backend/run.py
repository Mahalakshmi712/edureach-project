"""
EduReach Backend - Run Script
Start the Flask application
"""

from app.main import app
import os

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True') == 'True'
    
    print("=" * 50)
    print("EduReach Backend Server")
    print("=" * 50)
    print(f"Server running on: http://localhost:{port}")
    print(f"Debug mode: {debug}")
    print(f"API Base: http://localhost:{port}/api")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
