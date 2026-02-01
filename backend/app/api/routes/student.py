"""Student Routes"""
from flask import Blueprint, jsonify
student_bp = Blueprint('student', __name__)

@student_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify({'message': 'Student dashboard'}), 200
