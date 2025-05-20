#!/bin/bash

PORT=5000

echo "Checking if port $PORT is in use..."

PID=$(lsof -ti tcp:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Port $PORT is free."
else
    echo "⚠️  Port $PORT is in use by PID $PID. Killing it..."
    kill -9 $PID
    echo "✅ Port $PORT has been freed."
fi
