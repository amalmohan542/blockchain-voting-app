# Use official Python image
FROM python:3.10-slim

# Set working directory inside container to /app
WORKDIR /app

ENV PYTHONUNBUFFERED=1


# Copy only the backend code into the image
COPY . .

COPY run.sh run.sh
RUN chmod +x run.sh

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose Flask app port
EXPOSE 5050

# Run backend app
CMD ["bash", "run.sh"]
