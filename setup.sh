#!/bin/bash

echo "🔐 SecurePass Guard - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your MongoDB URI and secret keys!"
fi

echo "Installing backend dependencies..."
npm install

cd ..
echo "✅ Backend setup complete!"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

cd ..
echo "✅ Frontend setup complete!"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI and secret keys"
echo "2. Start MongoDB (if running locally)"
echo "3. Run 'npm run dev' in the backend directory"
echo "4. Run 'npm run dev' in the frontend directory"
echo "5. Open http://localhost:5173 in your browser"
echo ""
echo "Happy password securing! 🔒"
