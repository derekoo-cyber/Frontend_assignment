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

To transition this application from a local development startups to a production-ready system capable of handling high traffic, the following roadmap will be implemented:

### Database Evolution
- **Migration**: Migrate from SQLite to **PostgreSQL** (Managed Instance like AWS RDS).
- **Optimization**: Implement **B-Tree indexing** on critical columns (`user_id`, `email`) to ensure sub-millisecond query performance as the user base grows.

### Orchestration & Deployment
- **Containerization**: Usage of Docker is already implemented.
- **Orchestration**: Deploy to **Kubernetes (K8s)** to manage container lifecycles.
- **Scaling**: Enable **Horizontal Pod Autoscaling (HPA)** to automatically spin up more backend pods during traffic spikes.

### Performance & Caching
- **Caching Layer**: Introduce **Redis** to cache frequently accessed data (e.g., user sessions, popular notes) reducing direct database hits.
- **CDN**: Distribute frontend assets (JS/CSS/Images) via a global CDN (e.g., Cloudflare, AWS CloudFront) to minimize latency for users worldwide.
- **Load Balancing**: Use a Load Balancer (AWS ALB / Nginx) for efficient request distribution and SSL termination.

### Security Hardening
- **Secrets Management**: Move sensitive keys (JWT secrets, DB credentials) out of `.env` files and into a dedicated secrets manager like **AWS Secrets Manager** or **HashiCorp Vault**.
- **Network Security**: Implement strict CORS policies whitelisting only production domains.
- **SSL/TLS**: Enforce HTTPS for all communication.
