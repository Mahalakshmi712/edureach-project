"""Content Routes"""
from flask import Blueprint, jsonify
content_bp = Blueprint('content', __name__)

@content_bp.route('/upload', methods=['POST'])
def upload_content():
    return jsonify({'message': 'Content uploaded'}), 200
