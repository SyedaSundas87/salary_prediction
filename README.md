<div align="center">
  <img src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" alt="Banner" width="100%" />
  
  <h1>💼 Salary Predictor</h1>
  
  <p>
    <strong>A modern, full-stack machine learning web application that predicts potential salary packages based on academic history, technical skills, and target job profiles.</strong>
  </p>
  
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
    <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
    <img alt="Scikit-Learn" src="https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" />
  </p>
</div>

---

## 🌟 Features

- **Interactive UI**: A sleek, animated React frontend with responsive design and modern glassmorphism aesthetics.
- **Real-Time Prediction**: Instant salary projections using a trained `scikit-learn` Machine Learning model.
- **FastAPI Backend**: A highly performant API serving predictions seamlessly.
- **Unified Deployment**: Configured to serve both the frontend and backend as a single Web Service on Render for cost-effective hosting.

<img width="1303" height="633" alt="Screenshot (592)" src="https://github.com/user-attachments/assets/d829196d-2c90-4805-8814-712c844eac40" />


---

## 🏗️ Architecture

The application uses a unified architecture where the FastAPI backend serves both the `/api/predict` endpoint and the compiled static files (`dist/`) from the Vite frontend.

```text
frontend (React/Vite) -> fetch('/api/predict') -> backend (FastAPI) -> salary.joblib (ML Model)
```

---

## 🚀 Local Development

### Prerequisites
- **Node.js** (v16+)
- **Python** (v3.8+)

### Quick Start (Windows)
We've included a convenient batch script to handle all dependencies, build the frontend, and run the FastAPI server automatically.
```bash
# Just run the batch file
.\start_server.bat
```

### Manual Setup
If you prefer to run the services manually in separate terminals:

**1. Frontend Setup**
```bash
npm install
npm run dev
```

**2. Backend Setup**
```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

---

## 🌐 Deployment (Render)

This repository is perfectly optimized for deployment on [Render](https://render.com) as a **single Web Service**.

1. Create a new **Web Service** on Render connected to this repository.
2. Ensure the environment is set up for **Python 3**.
3. Use the following **Build Command**:
   ```bash
   npm install && npm run build && pip install -r requirements.txt
   ```
4. Use the following **Start Command**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

*Note: Ensure your `salary.joblib` binary model file is uploaded to the root of your GitHub repository before deploying!*

---

<div align="center">
  <p>Built with ❤️ using React & Python</p>
</div>
