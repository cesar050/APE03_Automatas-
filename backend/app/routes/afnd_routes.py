from flask import Blueprint, request, jsonify
from app.services.afnd_service import simulate_iot, simulate_slack, simulate_genetic

afnd_bp = Blueprint('afnd', __name__)

@afnd_bp.route('/iot/simulate', methods=['POST'])
def route_iot():
    data = request.get_json()
    return jsonify(simulate_iot(data.get('input', [])))

@afnd_bp.route('/slack/simulate', methods=['POST'])
def route_slack():
    data = request.get_json()
    return jsonify(simulate_slack(data.get('input', [])))

@afnd_bp.route('/genetic/simulate', methods=['POST'])
def route_genetic():
    data = request.get_json()
    return jsonify(simulate_genetic(data.get('input', [])))