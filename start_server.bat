call npm install
call npm run build
call pip install -r requirements.txt
python -m uvicorn main:app --port 8000