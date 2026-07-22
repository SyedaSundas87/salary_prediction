from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI()

# Load the model
try:
    model = joblib.load('salary.joblib')
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class PredictionPayload(BaseModel):
    cgpa: float
    branch: str
    college_tier: int
    python_skill: int
    dsa_skill: int
    ml_skill: int
    web_dev_skill: int
    coding_score: float
    communication_score: float
    aptitude_score: float
    internships: int
    projects: int
    backlogs: int
    resume_score: float
    skill_score: float
    company_type: str
    job_role: str

@app.post("/api/predict")
async def predict_salary(payload: PredictionPayload):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded properly.")
    
    # Convert payload to DataFrame as most scikit-learn pipelines with ColumnTransformer expect DataFrame
    data = pd.DataFrame([payload.dict()])
    
    # We might need to ensure categorical features are correctly handled by the pipeline
    try:
        prediction = model.predict(data)
        # Assuming the model returns a single value or an array of values
        predicted_salary = float(prediction[0])
        return {"predicted_salary_lpa": round(predicted_salary, 2)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Mount the static files for the React frontend
dist_path = os.path.join(os.path.dirname(__file__), "dist")
if os.path.isdir(dist_path):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")