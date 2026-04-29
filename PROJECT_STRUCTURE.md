# Project Structure

## Overview

SecurePass Guard is organized as a monorepo with separate frontend and backend directories.

```
securepass-guard/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Configuration files
│   │   └── db.js          # MongoDB connection
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── passwordController.js
│   │   └── vaultController.js
│   ├── middleware/         # Express middleware
│   │   ├── auth.js        # JWT authentication
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validate.js    # Input validation
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   └── Vault.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── passwords.js
│   │   └── vault.js
│   ├── utils/             # Utility functions
│   │   ├── encryption.js  # AES-256-GCM encryption
│   │   └── passwordChecker.js
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── server.js          # Entry point
│
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PasswordModal.jsx
│   │   │   ├── PasswordStrengthMeter.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/       # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PasswordChecker.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   ├── .env.example       # Environment variables template
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── API_DOCUMENTATION.md   # API endpoint documentation
├── FEATURES.md            # Complete feature list
├── PROJECT_STRUCTURE.md   # This file
├── QUICKSTART.md          # Quick start guide
├── README.md              # Main documentation
├── SECURITY.md            # Security best practices
├── setup.bat              # Windows setup script
└── setup.sh               # Linux/Mac setup script
```

## Backend Architecture

### Controllers
Handle business logic and request/response processing:
- `authController.js` - User registration, login, profile
- `passwordController.js` - Strength checking, breach detection, generation
- `vaultController.js` - CRUD operations for password vault

### Models
Define data schemas and database interactions:
- `User.js` - User account with bcrypt password hashing
- `Vault.js` - Encrypted password storage with metadata

### Middleware
Process requests before reaching controllers:
- `auth.js` - JWT token verification
- `errorHandler.js` - Centralized error handling
- `rateLimiter.js` - Rate limiting for different endpoints
- `validate.js` - Input validation and sanitization

### Routes
Define API endpoints and apply middleware:
- `auth.js` - Authentication endpoints
- `passwords.js` - Password utility endpoints
- `vault.js` - Password manager endpoints

### Utils
Reusable utility functions:
- `encryption.js` - AES-256-GCM encryption/decryption
- `passwordChecker.js` - Strength analysis, breach checking, generation

## Frontend Architecture

### Components
Reusable UI components:
- `Navbar.jsx` - Navigation bar with theme toggle
- `PasswordModal.jsx` - Modal for adding/editing passwords
- `PasswordStrengthMeter.jsx` - Visual strength indicator
- `PrivateRoute.jsx` - Protected route wrapper

### Context
Global state management:
- `AuthContext.jsx` - User authentication state
- `ThemeContext.jsx` - Dark/light theme state

### Pages
Full page components:
- `Home.jsx` - Landing page
- `Login.jsx` - User login
- `Register.jsx` - User registration
- `PasswordChecker.jsx` - Password strength and breach checker
- `Dashboard.jsx` - Password manager dashboard

## Data Flow

### Authentication Flow
1. User submits credentials
2. Frontend sends to `/api/auth/login`
3. Backend validates and returns JWT
4. Frontend stores token in localStorage
5. Token included in subsequent requests

### Password Storage Flow
1. User enters password details
2. Frontend sends to `/api/vault`
3. Backend checks strength and breaches
4. Password encrypted with AES-256-GCM
5. Encrypted data stored in MongoDB
6. Frontend receives confirmation

### Password Retrieval Flow
1. Frontend requests `/api/vault`
2. Backend verifies JWT token
3. Encrypted passwords retrieved from DB
4. Passwords decrypted before sending
5. Frontend displays in dashboard

## Security Layers

1. **Transport**: HTTPS (production)
2. **Authentication**: JWT tokens
3. **Authorization**: Protected routes
4. **Hashing**: bcrypt for user passwords
5. **Encryption**: AES-256-GCM for stored passwords
6. **Validation**: Input sanitization
7. **Rate Limiting**: API throttling

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Hashing**: bcrypt
- **Encryption**: Node.js crypto module
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: Context API

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Password Operations
- `POST /api/passwords/check-strength` - Check password strength
- `POST /api/passwords/check-breach` - Check for breaches
- `POST /api/passwords/generate` - Generate password

### Vault
- `GET /api/vault` - Get all passwords
- `POST /api/vault` - Create password
- `PUT /api/vault/:id` - Update password
- `DELETE /api/vault/:id` - Delete password
- `GET /api/vault/stats` - Get statistics

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/securepass
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-32-char-encryption-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Development Workflow

1. Start MongoDB
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Access at http://localhost:5173

## Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Testing Strategy

### Manual Testing
- User registration and login
- Password strength checking
- Breach detection
- Password CRUD operations
- Dark mode toggle
- Responsive design

### Recommended Automated Testing
- Unit tests for utilities
- Integration tests for API endpoints
- E2E tests for user flows
- Security testing

## Performance Considerations

- Rate limiting prevents abuse
- MongoDB indexing on userId
- Efficient encryption/decryption
- Lazy loading of components
- Optimized bundle size with Vite

## Scalability

- Stateless JWT authentication
- Horizontal scaling possible
- Database sharding for large datasets
- CDN for static assets
- Load balancing for API

## Maintenance

- Regular dependency updates
- Security patch monitoring
- Database backups
- Log monitoring
- Performance profiling
