from flask import Blueprint, request, jsonify
from . import db
from .models import Election, Candidate
from datetime import datetime

bp = Blueprint('routes', __name__)
from datetime import datetime
from flask import request, jsonify
from .models import Election
from . import db

@bp.route('/election', methods=['POST'])
def create_election():
    data = request.get_json()
    try:
        # Safely parse datetime strings
        # datetime.strptime(data['end_date'], "%Y-%m-%d %H:%M:%S")
        start_dt = datetime.strptime(data['start_date'], "%Y-%m-%d %H:%M:%S")
        end_dt = datetime.strptime(data['end_date'], "%Y-%m-%d %H:%M:%S")
        print(".............",start_dt)

        election = Election(
            name=data['name'].strip(),
            description=data.get('description', '').strip(),
            start_date=start_dt,
            end_date=end_dt
        )
        db.session.add(election)
        db.session.commit()

        return jsonify({
            "message": "Election created",
            "election_id": f"elec_{election.id:03}"
        }), 201
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
# ----- Candidate Routes ----- #

@bp.route('/candidates', methods=['POST'])
def add_candidates_bulk():
    data = request.get_json()
    candidates_data = data.get('candidates', [])
    election_id_str = data.get('election_id')

    if not election_id_str or not candidates_data:
        return jsonify({"message": "Missing election_id or candidates list"}), 400

    try:
        db_id = int(election_id_str.replace("elec_", ""))
        election = Election.query.get(db_id)
        if not election:
            return jsonify({"message": "Election not found"}), 404

        created_candidates = []

        for c in candidates_data:
            name = c.get('name')
            party = c.get('party')
            if not name or not party:
                continue  # Skip incomplete data
            candidate = Candidate(election_id=election.id, name=name, party=party)
            db.session.add(candidate)
            db.session.flush()  # Get candidate.id before commit
            created_candidates.append({
                "candidate_id": f"cand_{candidate.id:03}",
                "name": candidate.name,
                "party": candidate.party
            })

        db.session.commit()
        return jsonify({"message": "Candidates added successfully.", "candidates": created_candidates}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@bp.route('/candidates/<election_id>', methods=['GET'])
def list_candidates(election_id):
    try:
        db_id = int(election_id.replace("elec_", ""))
        candidates = Candidate.query.filter_by(election_id=db_id).all()
        return jsonify([
            {
                "candidate_id": f"cand_{c.id:03}",
                "name": c.name,
                "party": c.party
            } for c in candidates
        ]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/candidate/<candidate_id>', methods=['DELETE'])
def delete_candidate(candidate_id):
    try:
        db_id = int(candidate_id.replace("cand_", ""))
        candidate = Candidate.query.get(db_id)
        if not candidate:
            return jsonify({"message": "Candidate not found."}), 404

        db.session.delete(candidate)
        db.session.commit()
        return jsonify({"message": "Candidate removed successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 4