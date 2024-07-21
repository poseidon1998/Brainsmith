@echo off
cd /d "D:\DevNest\Brainsmith\nginx-1.26.1"
start nginx

cd /d "D:\DevNest\Brainsmith"
npm start


@REM cd /d "D:\DevNest\Brainsmith\apps\"
@REM uvicorn service:app --reload --port 8000