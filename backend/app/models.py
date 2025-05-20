from . import db
from datetime import datetime

from datetime import datetime

from datetime import datetime
from . import db


class Election(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.DateTime, nullable=False)  # supports time
    end_date = db.Column(db.DateTime, nullable=False)

    def status(self):
        now = datetime.utcnow()
        if now < self.start_date:
            return "upcoming"
        elif self.start_date <= now <= self.end_date:
            return "active"
        else:
            return "ended"

    def to_dict(self):
        return {
            "election_id": f"elec_{self.id:03}",
            "name": self.name,
            "description": self.description,
            "start_date": self.start_date.strftime('%Y-%m-%d %H:%M:%S'),
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S'),
            "status": self.status()
        }
class Candidate(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    election_id = db.Column(db.Integer, db.ForeignKey('election.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    party = db.Column(db.String(100), nullable=False)

    election = db.relationship('Election', backref=db.backref('candidates', lazy=True))

    def candidate_id(self):
        return f"cand_{self.id:03}"

    def to_dict(self):
        return {
            "candidate_id": self.candidate_id(),
            "name": self.name,
            "party": self.party
        }
