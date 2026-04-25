from flask import Blueprint, request, jsonify
from app.services.afd_service import simulate_banking, simulate_lock, simulate_scientific

afd_bp = Blueprint('afd', __name__)

@afd_bp.route('/banking/simulate', methods=['POST'])
def route_banking():
    data = request.get_json()
    return jsonify(simulate_banking(data.get('input', [])))

@afd_bp.route('/lock/simulate', methods=['POST'])
def route_lock():
    data = request.get_json()
    return jsonify(simulate_lock(data.get('input', [])))

@afd_bp.route('/scientific/simulate', methods=['POST'])
def route_scientific():
    data = request.get_json()
    return jsonify(simulate_scientific(data.get('input', '')))