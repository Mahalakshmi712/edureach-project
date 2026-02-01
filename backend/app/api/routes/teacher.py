"""Teacher Routes"""
from flask import Blueprint, jsonify
teacher_bp = Blueprint('teacher', __name__)

@teacher_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify({'message': 'Teacher dashboard'}), 200
