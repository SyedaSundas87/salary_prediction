import { PredictionPayload, PredictionResponse } from '../types';

export async function predictSalary(data: PredictionPayload): Promise<PredictionResponse> {
  const res = await fetch('/api/predict', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) 
  });
  
  if (!res.ok) {
    throw new Error('Prediction failed');
  }
  
  return res.json();
}