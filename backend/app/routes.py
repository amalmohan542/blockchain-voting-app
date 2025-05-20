from flask import Blueprint, request, jsonify
from . import db
from .models import Election
from datetime import datetime

bp = Blueprint('routes', __name__)

@bp.route('/election', methods=['POST'])
def create_election():
    data = request.get_json()
    try:
        election = Election(
            name=data['name'],
            description=data.get('description'),
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        )
        db.session.add(election)
        db.session.commit()
        return jsonify({"message": "Election created", "election_id": f"elec_{election.id:03}"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/election', methods=['GET'])
def get_elections():
    elections = Election.query.all()
    return jsonify([
        {
            "election_id": f"elec_{e.id:03}",
            "name": e.name,
            "status": e.status()
        } for e in elections
    ])

@bp.route('/election/<election_id>', methods=['GET'])
def get_election(election_id):
    try:
        db_id = int(election_id.replace("elec_", ""))
        election = Election.query.get_or_404(db_id)
        return jsonify(election.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 400
