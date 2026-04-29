# 🔐 SecurePass Guard

A modern, full-stack password security and management application with stunning 3D UI effects, real-time strength analysis, and breach detection.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-8.0.0-green)

## ✨ Features

### 🎨 Frontend
- **Stunning 3D UI** with parallax effects and animations
- **Real-time Password Strength Meter** with detailed feedback
- **Breach Detection** using HaveIBeenPwned API
- **Secure Password Generator** with customizable options
- **Dark/Light Theme** with smooth transitions
- **Responsive Design** for all devices
- **Glass-morphic Design** with modern aesthetics

### 🔒 Backend
- **Password Strength Analysis** with comprehensive scoring
- **Breach Detection** using k-anonymity model
- **Secure Password Generation** with cryptographic randomness
- **JWT Authentication** for secure user sessions
- **Rate Limiting** to prevent abuse
- **Input Validation** with express-validator
- **Error Handling** with custom error classes
- **API Documentation** built-in

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (optional - only for vault features)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/karthik07-de/password-checker-.git
cd password-checker-
```

2. **Install dependencies**

**Option A: Automatic (Recommended)**
```bash
# Windows
setup.bat

# Linux/Mac
chmod +x setup.sh
./setup.sh
```

**Option B: Manual**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/securepass
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=30d
ENCRYPTION_KEY=your-32-character-encryption-key-change-this
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start the application**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

## 📸 Screenshots

### Home Page
Beautiful landing page with 3D effects and parallax animations.

### Password Checker
Real-time password strength analysis with breach detection.

### Password Generator
Generate secure passwords with customizable options.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## 📚 API Documentation

### Password Endpoints

#### Check Password Strength
```http
POST /api/passwords/check-strength
Content-Type: application/json

{
  "password": "YourPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "strength": "strong",
    "score": 7,
    "maxScore": 8,
    "feedback": [],
    "hasLowercase": true,
    "hasUppercase": true,
    "hasNumbers": true,
    "hasSpecialChars": true
  }
}
```

#### Check for Breaches
```http
POST /api/passwords/check-breach
Content-Type: application/json

{
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isBreached": true,
    "breachCount": 2389641,
    "message": "This password has been seen 2,389,641 times in data breaches"
  }
}
```

#### Generate Password
```http
POST /api/passwords/generate
Content-Type: application/json

{
  "length": 16,
  "uppercase": true,
  "lowercase": true,
  "numbers": true,
  "symbols": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "password": "K9#mP2$xL5@nQ8!w",
    "strength": "strong",
    "score": 8,
    "length": 16
  }
}
```

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/update-details` - Update profile (protected)
- `PUT /api/auth/update-password` - Change password (protected)
- `DELETE /api/auth/delete-account` - Delete account (protected)

### System Endpoints

- `GET /api/health` - Health check
- `GET /api` - API documentation

## 🎨 UI Features

### 3D Effects
- **Parallax Mouse Tracking** - Elements respond to mouse movement
- **Card Transformations** - 3D hover effects on cards
- **Floating Animations** - Smooth floating elements
- **Pulse Glow Effects** - Animated glowing shadows
- **Glass Morphism** - Frosted glass effect with depth

### Animations
- Slide-in effects
- Fade transitions
- Bounce animations
- Pulse glows
- Smooth hover states

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly

## 🔒 Security Features

1. **Password Hashing** - bcrypt with 10 rounds
2. **JWT Authentication** - Secure token-based auth
3. **Rate Limiting** - Prevents brute force attacks
4. **Input Validation** - Prevents injection attacks
5. **CORS Protection** - Configured origins
6. **Helmet.js** - Security headers
7. **K-Anonymity** - Breach checking without exposing passwords
8. **Environment Variables** - Sensitive data protection

## 📁 Project Structure

```
password-checker-/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Backend dependencies
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Global styles
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
├── .gitignore
├── README.md
├── setup.bat            # Windows setup script
└── setup.sh             # Linux/Mac setup script
```

## 🧪 Testing

### Test Password Strength API
```bash
curl -X POST http://localhost:5000/api/passwords/check-strength \
  -H "Content-Type: application/json" \
  -d '{"password":"Test123!"}'
```

### Test Password Generator
```bash
curl -X POST http://localhost:5000/api/passwords/generate \
  -H "Content-Type: application/json" \
  -d '{"length":16,"uppercase":true,"lowercase":true,"numbers":true,"symbols":true}'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Karthik**
- GitHub: [@karthik07-de](https://github.com/karthik07-de)

## 🙏 Acknowledgments

- [HaveIBeenPwned API](https://haveibeenpwned.com/API/v3) for breach detection
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast development

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

**Made with ❤️ by Karthik**
