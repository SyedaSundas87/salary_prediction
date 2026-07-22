# Salary Predictor

A modern, full-stack web application designed to predict potential salary packages based on academic history, technical skills, and target job profiles.

## Features

- **Interactive UI**: A sleek, animated React frontend with responsive design.
- **Real-Time Prediction**: Instant salary projections using a trained Machine Learning model.
- **FastAPI Backend**: A highly performant API serving predictions seamlessly.
- **Unified Deployment**: Configured to serve both the frontend and backend as a single Web Service.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Motion
- **Backend**: Python, FastAPI, Uvicorn
- **Machine Learning**: Scikit-Learn, Joblib, Pandas

## Local Development

### 1. Backend Setup (FastAPI & Model)
Make sure you have Python 3 installed.
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the local development server
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup (React & Vite)
Make sure you have Node.js installed.
```bash
# Install Node dependencies
npm install

# Start the Vite development server (proxies API requests to FastAPI)
npm run dev
```

## Deployment (Render)

This repository is optimized for deployment on [Render](https://render.com) as a single **Web Service**.

1. Create a new **Web Service** on Render connected to this repository.
2. **Build Command**:
   ```bash
   npm install && npm run build && pip install -r requirements.txt
   ```
3. **Start Command**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

The FastAPI backend will automatically serve the static React frontend from the `dist/` directory.