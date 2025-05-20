# 2025 AIC Project W2

**Topic A:** Blockchain-based Decentralized Voting System

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Production](#production)
  - [Development (with Hot Reload)](#development-with-hot-reload)
- [Environment Variables](#environment-variables)

---

## Project Overview
A decentralized voting system built with React (frontend), Flask (backend), and Docker for containerization. The system supports election creation, candidate management, and secure voting, with a modern UI using shadcn/ui components.

## Tech Stack
- **Frontend:** React, Vite, shadcn/ui, TypeScript
- **Backend:** Flask (Python)
- **Database:** SQLite (default, can be swapped)
- **Containerization:** Docker, Docker Compose
- **Reverse Proxy (Prod):** Nginx

## Project Structure
```
backend/        # Flask backend
frontend/       # React frontend (Vite + shadcn/ui)
docker-compose.yml           # Production compose file
docker-compose.dev.yml       # Development compose file (hot reload)
README.md
```

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) installed
- (Optional) [Node.js](https://nodejs.org/) and [Python](https://www.python.org/) for local-only dev

### Production
```sh
docker-compose build
docker-compose up
```
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5050

### Development (with Hot Reload)
1. Uncomment the development section in `frontend/Dockerfile` (see comments in file).
2. Run:
```sh
docker-compose -f docker-compose.dev.yml up --build
```
- **Frontend:** http://localhost:3000 (hot reload)
- **Backend:** http://localhost:5050

## Environment Variables
- Create a `.env` file in `frontend/`:
  ```env
  VITE_API_URL=http://localhost:5050
  ```
