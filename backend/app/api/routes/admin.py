"""
Admin Routes
Handles all admin-related endpoints
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.auth_service import role_required
from app.config.database import get_db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_dashboard():
    """Get admin dashboard statistics"""
    try:
        db = get_db()
        
        stats = {
            'total_teachers': db.teachers.count_documents({}),
            'total_students': db.students.count_documents({}),
            'total_courses': db.courses.count_documents({}),
            'active_sessions': db.sessions.count_documents({'status': 'live'}),
            'total_quizzes': db.quizzes.count_documents({}),
            'total_submissions': db.submissions.count_documents({})
        }
        
        return jsonify({
            'success': True,
            'data': stats
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/teachers', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_teachers():
    """Get all teachers"""
    try:
        db = get_db()
        teachers = list(db.teachers.find({}, {'_id': 0}))
        
        return jsonify({
            'success': True,
            'data': teachers
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/teachers', methods=['POST'])
@jwt_required()
@role_required('admin')
def create_teacher():
    """Create a new teacher"""
    try:
        data = request.get_json()
        db = get_db()
        
        # TODO: Implement teacher creation logic
        # 1. Validate data
        # 2. Create user account
        # 3. Create teacher profile
        # 4. Send welcome email
        
        return jsonify({
            'success': True,
            'message': 'Teacher created successfully'
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/students', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_students():
    """Get all students"""
    try:
        db = get_db()
        students = list(db.students.find({}, {'_id': 0}))
        
        return jsonify({
            'success': True,
            'data': students
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/students', methods=['POST'])
@jwt_required()
@role_required('admin')
def create_student():
    """Create a new student"""
    try:
        data = request.get_json()
        db = get_db()
        
        # TODO: Implement student creation logic
        
        return jsonify({
            'success': True,
            'message': 'Student created successfully'
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/reports/teacher-performance', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_teacher_performance():
    """Get teacher performance reports"""
    try:
        # TODO: Implement analytics
        return jsonify({
            'success': True,
            'data': []
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@admin_bp.route('/reports/student-progress', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_student_progress():
    """Get student progress reports"""
    try:
        # TODO: Implement analytics
        return jsonify({
            'success': True,
            'data': []
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500
