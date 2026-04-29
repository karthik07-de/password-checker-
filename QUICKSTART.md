# Quick Start Guide

Get SecurePass Guard up and running in 5 minutes!

## Prerequisites

- Node.js v16 or higher
- MongoDB (local or Atlas)
- npm or yarn

## Option 1: Automated Setup (Recommended)

### Windows
```bash
setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

## Option 2: Manual Setup

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/securepass
JWT_SECRET=your-super-secret-jwt-key-change-this
ENCRYPTION_KEY=your-32-character-encryption-key
NODE_ENV=development
```

**Important:** Generate secure keys:
```bash
# Generate a random 32-character key
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get your connection string
- Update `MONGODB_URI` in backend/.env

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

Navigate to: http://localhost:5173

## First Steps

1. **Create an Account**
   - Click "Sign Up"
   - Enter your name, email, and password
   - Click "Create Account"

2. **Check a Password**
   - Go to "Check Password"
   - Enter any password to see its strength
   - Click "Check for Data Breaches"

3. **Generate a Password**
   - Use the password generator on the right
   - Customize length and character types
   - Click "Generate Password"

4. **Save to Vault**
   - Go to "Dashboard"
   - Click "Add Password"
   - Fill in website, username, and password
   - Click "Save Password"

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in backend/.env

### ENCRYPTION_KEY Error
```
Error: ENCRYPTION_KEY must be exactly 32 characters
```
**Solution:** Generate a 32-character key:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Frontend Can't Connect to Backend
**Solution:** Check that:
- Backend is running on port 5000
- VITE_API_URL in frontend/.env is correct
- No CORS errors in browser console

## Default Ports

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Testing the API

Use curl or Postman to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Check password strength
curl -X POST http://localhost:5000/api/passwords/check-strength \
  -H "Content-Type: application/json" \
  -d '{"password":"TestPassword123!"}'
```

## Production Deployment

See [README.md](README.md) for production deployment instructions.

## Need Help?

- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- Review [SECURITY.md](SECURITY.md) for security best practices
- See [FEATURES.md](FEATURES.md) for complete feature list

## Next Steps

- Explore the password checker
- Save your first password
- Check the dashboard statistics
- Try the password generator
- Enable dark mode!

Happy securing! 🔒
