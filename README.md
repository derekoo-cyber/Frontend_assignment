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

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/venv
   ```

2. (Optional) Create and activate a virtual environment if not already active:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy python-jose[cryptography] passlib[bcrypt] python-multipart
   ```

4. **Environment Variables**:
   > [!IMPORTANT]
   > The `.env` file containing sensitive environment variables (like `SUPER_SECRET_KEY`) has been **gitignored** for security reasons. You must create one locally.

   - Create a file named `.env` in `backend/venv/`.
   - Add the following content:
     ```env
     SECRET_KEY=your_generated_secret_key_here
     ```
   - **How to generate a secure key**:
     Run this Python command in your terminal to generate a random 32-character string:
     ```bash
     python -c "import secrets; print(secrets.token_hex(32))"
     ```
     Copy the output and paste it as your `SECRET_KEY`.

   - The database URL defaults to `sqlite:///./app.db` in `database.py`.

5. **Initialize Database**:
   The database tables are automatically created when you start the application for the first time.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Check API URL**:
   Ensure `src/api/axios.js` points to your running backend:
   ```javascript
   baseURL: 'http://127.0.0.1:8000/api/v1',
   ```

---

## 🏃‍♂️ Running the Application

### Start the Backend
From the `backend/venv` directory, run:
```bash
python -m uvicorn main:app --reload
```
The server will start at `http://127.0.0.1:8000`.
- API Docs: `http://127.0.0.1:8000/docs`

### Start the Frontend
From the `frontend` directory, run:
```bash
npm run dev
```
The app will be accessible at `http://localhost:5173`.

---

## 🔑 Demo Credentials

Since this is a local setup, you can register a new user or use the following if you have seeded the DB (Note: Data is local to your machine):

1. **Register** a new account at `/signup`.
2. **Login** with your new credentials at `/login`.

**Example Flow:**
1. Go to Signup.
2. Email: `test@example.com`
3. Password: `password123`
4. Login to access the Dashboard.
