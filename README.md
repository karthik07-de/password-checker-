# 🔐 SecurePass Guard

A full-stack web application for password strength checking, breach detection, and secure password management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

> **Quick Links**: [Get Started](GET_STARTED.md) | [API Docs](API_DOCUMENTATION.md) | [Features](FEATURES.md) | [Security](SECURITY.md) | [Troubleshooting](TROUBLESHOOTING.md)

## Features

- **Password Strength Checker**: Real-time analysis with visual strength meter
- **Breach Detection**: Integration with Have I Been Pwned API using k-anonymity
- **User Authentication**: Secure JWT-based authentication
- **Password Manager**: Encrypted storage of credentials
- **Breach Alerts**: Dashboard showing weak and compromised passwords
- **Password Generator**: Generate strong random passwords
- **Dark Mode**: Full dark mode support

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Encryption**: bcrypt (hashing), crypto (AES-256-GCM encryption)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/securepass
JWT_SECRET=your-super-secret-jwt-key-change-this
ENCRYPTION_KEY=your-32-character-encryption-key-change-this-now
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open browser at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Password Operations
- `POST /api/passwords/check-strength` - Check password strength
- `POST /api/passwords/check-breach` - Check if password is breached
- `POST /api/passwords/generate` - Generate random password

### Password Manager
- `GET /api/vault` - Get all saved passwords
- `POST /api/vault` - Save new password
- `PUT /api/vault/:id` - Update password
- `DELETE /api/vault/:id` - Delete password
- `GET /api/vault/stats` - Get dashboard statistics

## Security Features

- Passwords hashed with bcrypt (10 rounds)
- Stored credentials encrypted with AES-256-GCM
- JWT tokens for authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- HTTPS recommended for production
- k-anonymity model for breach checking

## Project Structure

```
securepass-guard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## 📖 Documentation

- **[GET_STARTED.md](GET_STARTED.md)** - Quick start guide for new users
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup instructions
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[FEATURES.md](FEATURES.md)** - Full list of implemented features
- **[SECURITY.md](SECURITY.md)** - Security best practices and implementation
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Code organization and architecture
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to the project

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - See [LICENSE](LICENSE) file for details
