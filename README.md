# VectorShift Assignment

This project consists of a frontend (React) and a backend (Python). Follow the steps below to set up and run both parts of the application.

## Backend Setup

### Prerequisites

- Python 3.8 or higher

### Installation & Running

1. Open a terminal and navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies :
   ```sh
   pip install fastapi networkx uvicorn
   ```
3. Run the backend server:
   ```sh
   python -m uvicorn main:app --reload
   ```

---

## Frontend Setup

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (comes with Node.js)

### Installation & Running

1. Open a terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Notes

- Make sure the backend is running before using features in the frontend that require API access.

---
