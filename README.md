# Front End Assignment 

A full-stack application built with **React (Vite)** and **FastAPI**. This application allows users to create accounts, log in, and manage their personal notes secure with JWT authentication.

## Tech Stack

### Frontend
- **React 19**: Built with Vite for fast HMR and optimized builds.
- **TailwindCSS**: Utility-first CSS framework for modern, responsive styling.
- **Axios**: For handling HTTP requests to the backend.
- **React Router**: For client-side routing and protected routes.
- **Lucide React**: For modern UI icons.

### Backend
- **FastAPI**: High-performance Python web framework.
- **SQLite**: Lightweight database for data persistence (deployed as `app.db`).
- **SQLAlchemy**: ORM for database interactions.
- **PyJWT & Passlib**: For secure JWT authentication and password hashing.

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.10+
- Docker & Docker Compose (Recommended)

### 1. Docker Setup (Recommended)
The easiest way to run the application is using Docker.

1. Ensure Docker Desktop is running.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - Frontend: `http://localhost:5173`
   - Backend API Docs: `http://localhost:8000/docs`

### 2. Manual Setup

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   # Windows: .\venv\Scripts\activate
   # Mac/Linux: source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install & Run:
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 Production Scaling Strategy

To transition to a production-ready system, we will migrate from SQLite to **PostgreSQL** with B-Tree indexing for performance. Deployment will be managed via **Kubernetes** with **Horizontal Pod Autoscaling (HPA)** to handle traffic spikes. We will introduce **Redis** for caching and a global **CDN** to minimize latency. **AWS ALB** will handle load balancing and SSL termination, while security will be enhanced by moving secrets to **AWS Secrets Manager**, enforcing strict CORS, and ensuring full HTTPS compliance.
