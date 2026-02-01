"""Live Class Routes"""
from flask import Blueprint, jsonify
live_class_bp = Blueprint('live_class', __name__)

@live_class_bp.route('/start', methods=['POST'])
def start_class():
    return jsonify({'message': 'Live class started'}), 200
