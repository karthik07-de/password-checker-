# 🚀 Get Started with SecurePass Guard

Welcome! This guide will help you get SecurePass Guard running in just a few minutes.

## 📋 What You'll Need

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **Code Editor** (VS Code recommended)
- **Terminal/Command Prompt**

## ⚡ Quick Start (5 Minutes)

### Step 1: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Install all dependencies
- Create .env files
- Set up both frontend and backend

### Step 2: Configure Environment

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/securepass
JWT_SECRET=change-this-to-a-random-secret-key
ENCRYPTION_KEY=change-this-to-32-characters!!
NODE_ENV=development
```

**Generate secure keys:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in backend/.env

### Step 4: Start the Application

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

### Step 5: Open in Browser

Navigate to: **http://localhost:5173**

## 🎯 First Steps

### 1. Create Your Account
- Click "Sign Up" in the top right
- Enter your name, email, and a strong password
- Click "Create Account"

### 2. Try the Password Checker
- Click "Check Password" in the navigation
- Enter any password to see its strength
- Click "Check for Data Breaches" to see if it's compromised

### 3. Generate a Strong Password
- Use the password generator on the right side
- Adjust length and character options
- Click "Generate Password"
- Copy and use it!

### 4. Save Your First Password
- Go to "Dashboard"
- Click "Add Password"
- Fill in:
  - Website (e.g., "github.com")
  - Username (e.g., "user@example.com")
  - Password (use the generator!)
  - Notes (optional)
- Click "Save Password"

### 5. Explore Features
- View your password statistics
- Toggle password visibility
- Copy passwords to clipboard
- Edit or delete entries
- Try dark mode!

## 📚 Learn More

### Documentation
- **[README.md](README.md)** - Complete overview
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference
- **[FEATURES.md](FEATURES.md)** - Full feature list
- **[SECURITY.md](SECURITY.md)** - Security practices

### Troubleshooting
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

### Development
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Code organization
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute

### Deployment
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

## 🔧 Common Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Both
```bash
# From root directory
npm run install:all      # Install all dependencies
npm run dev:backend      # Start backend
npm run dev:frontend     # Start frontend
```

## 🎨 Features Overview

### ✅ Password Strength Checker
- Real-time analysis
- Visual strength meter
- Detailed feedback
- Character requirements

### ✅ Breach Detection
- Have I Been Pwned integration
- Privacy-preserving k-anonymity
- Shows breach count
- Warns about compromised passwords

### ✅ Password Manager
- Secure encrypted storage
- AES-256-GCM encryption
- Easy CRUD operations
- Search and filter

### ✅ Password Generator
- Customizable length (8-32 chars)
- Character type options
- Cryptographically secure
- Instant strength check

### ✅ Dashboard
- Statistics overview
- Weak password alerts
- Compromised password warnings
- Quick actions

### ✅ Security
- JWT authentication
- bcrypt password hashing
- Rate limiting
- Input validation

### ✅ UI/UX
- Dark mode support
- Responsive design
- Smooth animations
- Intuitive interface

## 🐛 Having Issues?

### MongoDB won't connect
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

### Port already in use
```bash
# Change port in backend/.env
PORT=5001
```

### Dependencies won't install
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### More help
Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

## 💡 Tips

1. **Use Strong Passwords**
   - At least 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Avoid common words

2. **Check for Breaches Regularly**
   - Run breach checks on saved passwords
   - Change compromised passwords immediately

3. **Organize Your Passwords**
   - Use descriptive website names
   - Add notes for context
   - Keep vault organized

4. **Secure Your Account**
   - Use a strong master password
   - Don't share your credentials
   - Log out on shared devices

5. **Backup Important Data**
   - Export passwords periodically (feature coming soon)
   - Keep encryption key safe
   - Document recovery process

## 🎓 Next Steps

### For Users
1. Import existing passwords
2. Check all passwords for breaches
3. Update weak passwords
4. Enable dark mode
5. Explore all features

### For Developers
1. Read the code structure
2. Understand the API
3. Review security implementation
4. Try making modifications
5. Contribute improvements

### For Deployers
1. Set up production environment
2. Configure MongoDB Atlas
3. Deploy to hosting platform
4. Set up monitoring
5. Configure backups

## 🤝 Get Help

- **Issues:** [GitHub Issues](https://github.com/yourusername/securepass-guard/issues)
- **Questions:** Open a discussion
- **Security:** Email security@example.com
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 Quick Reference

### URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

### Default Credentials
- No default credentials
- Create your own account

### File Locations
- Backend config: `backend/.env`
- Frontend config: `frontend/.env`
- Database: MongoDB (local or Atlas)

### Important Commands
```bash
# Setup
./setup.sh (or setup.bat on Windows)

# Start
cd backend && npm run dev
cd frontend && npm run dev

# Build
cd frontend && npm run build

# Test API
curl http://localhost:5000/api/health
```

## 🎉 You're Ready!

You now have a fully functional password security application. Start by:

1. ✅ Creating your account
2. ✅ Checking a password
3. ✅ Generating a strong password
4. ✅ Saving it to your vault
5. ✅ Exploring the dashboard

**Happy password securing! 🔒**

---

Need more help? Check out the other documentation files or open an issue on GitHub.
