"""
EduReach Backend Main Application
Entry point for the Flask application
"""

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', './uploads')
    app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 52428800))  # 50 MB
    
    # CORS Configuration
    CORS(app, resources={
        r"/api/*": {
            "origins": os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','),
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # JWT Configuration
    jwt = JWTManager(app)
    
    # Database initialization
    from app.config.database import init_db
    init_db(app)
    
    # Register blueprints (routes)
    from app.api.routes.admin import admin_bp
    from app.api.routes.teacher import teacher_bp
    from app.api.routes.student import student_bp
    from app.api.routes.live_class import live_class_bp
    from app.api.routes.content import content_bp
    from app.api.routes.assessment import assessment_bp
    
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(teacher_bp, url_prefix='/api/teacher')
    app.register_blueprint(student_bp, url_prefix='/api/student')
    app.register_blueprint(live_class_bp, url_prefix='/api/live-class')
    app.register_blueprint(content_bp, url_prefix='/api/content')
    app.register_blueprint(assessment_bp, url_prefix='/api/assessment')
    
    # Error handlers
    from app.api.middleware.error_handler import register_error_handlers
    register_error_handlers(app)
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {
            'status': 'healthy',
            'message': 'EduReach API is running'
        }, 200
    
    # Ping endpoint for network testing
    @app.route('/api/ping', methods=['GET', 'HEAD'])
    def ping():
        return {'message': 'pong'}, 200
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True') == 'True'
    app.run(host='0.0.0.0', port=port, debug=debug)
