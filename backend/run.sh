#!/bin/bash

export FLASK_APP=app.main
export FLASK_ENV=development
python -m flask run --host=0.0.0.0 --port=5050
