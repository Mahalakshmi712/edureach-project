"""Assessment Routes"""
from flask import Blueprint, jsonify
assessment_bp = Blueprint('assessment', __name__)

@assessment_bp.route('/quiz', methods=['GET'])
def get_quizzes():
    return jsonify({'data': []}), 200
