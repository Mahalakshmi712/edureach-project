"""
Database Configuration
Supports both MongoDB and PostgreSQL
"""

import os
from pymongo import MongoClient
# from flask_sqlalchemy import SQLAlchemy  # Uncomment for PostgreSQL

# MongoDB Client
mongo_client = None
mongo_db = None

# SQLAlchemy instance (for PostgreSQL)
# db = SQLAlchemy()  # Uncomment for PostgreSQL

def init_db(app):
    """Initialize database based on configuration"""
    
    # MongoDB Configuration
    mongodb_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/edureach')
    db_name = os.getenv('MONGODB_DB_NAME', 'edureach')
    
    try:
        global mongo_client, mongo_db
        mongo_client = MongoClient(mongodb_uri)
        mongo_db = mongo_client[db_name]
        
        # Test connection
        mongo_client.server_info()
        print(f"✓ Connected to MongoDB: {db_name}")
        
        # Create indexes
        create_indexes()
        
    except Exception as e:
        print(f"✗ MongoDB connection failed: {e}")
        raise
    
    # PostgreSQL Configuration (alternative)
    # Uncomment below if using PostgreSQL instead
    """
    database_url = os.getenv('DATABASE_URL', 'postgresql://localhost/edureach')
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        print(f"✓ Connected to PostgreSQL")
    """

def create_indexes():
    """Create database indexes for better performance"""
    
    try:
        # Users collection indexes
        mongo_db.users.create_index('email', unique=True)
        mongo_db.users.create_index('role')
        
        # Teachers collection indexes
        mongo_db.teachers.create_index('user_id')
        mongo_db.teachers.create_index('department')
        
        # Students collection indexes
        mongo_db.students.create_index('user_id')
        mongo_db.students.create_index('batch')
        mongo_db.students.create_index('enrollment_number', unique=True)
        
        # Courses collection indexes
        mongo_db.courses.create_index('teacher_id')
        mongo_db.courses.create_index('subject')
        
        # Sessions collection indexes
        mongo_db.sessions.create_index('course_id')
        mongo_db.sessions.create_index('start_time')
        mongo_db.sessions.create_index([('course_id', 1), ('start_time', -1)])
        
        # Quizzes collection indexes
        mongo_db.quizzes.create_index('course_id')
        mongo_db.quizzes.create_index('teacher_id')
        
        # Submissions collection indexes
        mongo_db.submissions.create_index('quiz_id')
        mongo_db.submissions.create_index('student_id')
        mongo_db.submissions.create_index([('quiz_id', 1), ('student_id', 1)], unique=True)
        
        # Content collection indexes
        mongo_db.content.create_index('course_id')
        mongo_db.content.create_index('type')
        
        # Attendance collection indexes
        mongo_db.attendance.create_index('session_id')
        mongo_db.attendance.create_index('student_id')
        mongo_db.attendance.create_index([('session_id', 1), ('student_id', 1)], unique=True)
        
        print("✓ Database indexes created successfully")
        
    except Exception as e:
        print(f"Warning: Index creation failed: {e}")

def get_db():
    """Get database instance"""
    return mongo_db

def close_db():
    """Close database connection"""
    if mongo_client:
        mongo_client.close()
        print("✓ Database connection closed")
