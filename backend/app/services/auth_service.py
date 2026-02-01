"""
Authentication Service
Handles user authentication and authorization
"""

from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.config.database import get_db

def role_required(required_role):
    """
    Decorator to require specific role for accessing endpoints
    Usage: @role_required('admin')
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            current_user_id = get_jwt_identity()
            db = get_db()
            
            # Get user from database
            user = db.users.find_one({'_id': current_user_id})
            
            if not user:
                return jsonify({
                    'success': False,
                    'message': 'User not found'
                }), 404
            
            if user.get('role') != required_role:
                return jsonify({
                    'success': False,
                    'message': 'Insufficient permissions'
                }), 403
            
            return fn(*args, **kwargs)
        return wrapper
    return decorator
