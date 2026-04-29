@echo off
echo 🔐 SecurePass Guard - Setup Script
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update the .env file with your MongoDB URI and secret keys!
)

echo Installing backend dependencies...
call npm install

cd ..
echo ✅ Backend setup complete!
echo.

REM Frontend Setup
echo 📦 Setting up Frontend...
cd frontend

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install

cd ..
echo ✅ Frontend setup complete!
echo.

echo 🎉 Setup Complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI and secret keys
echo 2. Start MongoDB (if running locally)
echo 3. Run 'npm run dev' in the backend directory
echo 4. Run 'npm run dev' in the frontend directory
echo 5. Open http://localhost:5173 in your browser
echo.
echo Happy password securing! 🔒
pause
