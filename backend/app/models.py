from . import db
from datetime import datetime

from datetime import datetime

class Election(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def status(self):
        today = datetime.utcnow().date()
        # Before the start date
        if today < self.start_date:
            return "not started"
        # After the end date
        elif today > self.end_date:
            return "finished"
        # During the election (between start and end dates)
        elif today == self.start_date:
            return "just started"
        elif today == self.end_date:
            return "just ended"
        else:
            return "in progress"

    def to_dict(self):
        return {
            "election_id": f"elec_{self.id:03}",
            "name": self.name,
            "description": self.description,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "status": self.status()
        }
