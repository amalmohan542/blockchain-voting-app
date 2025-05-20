from . import create_app, db  # ✅ relative import
from flask_cors import CORS
from app.models import Election, Candidate

app = create_app()
CORS(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    print("starting flask app")
    app.run(host='0.0.0.0', port=5050)
