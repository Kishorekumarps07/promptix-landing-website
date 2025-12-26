@echo off
echo ========================================
echo PromptiX Backend Setup
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    echo PORT=5000 > .env
    echo MONGODB_URI=mongodb+srv://infopromptix_db_user:SvexHPm0LJc2024@promptixadminmptix_db?retryWrites=true^&w=majority^&appName=Promptix >> .env
    echo NODE_ENV=development >> .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo.
echo Server will start on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

npm start
