export interface PredictionPayload {
  cgpa: number;
  branch: string;
  college_tier: number;
  python_skill: number;
  dsa_skill: number;
  ml_skill: number;
  web_dev_skill: number;
  coding_score: number;
  communication_score: number;
  aptitude_score: number;
  internships: number;
  projects: number;
  backlogs: number;
  resume_score: number;
  skill_score: number;
  company_type: string;
  job_role: string;
}

export interface PredictionResponse {
  predicted_salary_lpa: number;
}