# Troubleshooting Guide

Common issues and their solutions for SecurePass Guard.

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install

# Try using a different registry
npm install --registry=https://registry.npmjs.org/
```

### Node version mismatch

**Problem:** `Error: The engine "node" is incompatible`

**Solution:**
```bash
# Check your Node version
node --version

# Install Node v16 or higher
# Use nvm (Node Version Manager)
nvm install 16
nvm use 16
```

## Backend Issues

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**

1. **Check if MongoDB is running:**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

2. **Verify connection string:**
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/securepass

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/securepass
```

3. **Check MongoDB status:**
```bash
mongosh
# or
mongo
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

1. **Change the port:**
```env
# In backend/.env
PORT=5001
```

2. **Kill the process using the port:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### JWT Secret Error

**Problem:** `Error: secretOrPrivateKey must have a value`

**Solution:**
```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to backend/.env
JWT_SECRET=<generated-secret>
```

### Encryption Key Error

**Problem:** `Error: ENCRYPTION_KEY must be exactly 32 characters`

**Solution:**
```bash
# Generate a 32-character key
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Add to backend/.env
ENCRYPTION_KEY=<generated-key>
```

### bcrypt Installation Error

**Problem:** `Error: Cannot find module 'bcrypt'`

**Solutions:**
```bash
# Rebuild bcrypt
npm rebuild bcrypt --build-from-source

# Or use bcryptjs instead
npm uninstall bcrypt
npm install bcryptjs
```

## Frontend Issues

### Cannot Connect to Backend

**Problem:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solutions:**

1. **Verify backend is running:**
```bash
curl http://localhost:5000/api/health
```

2. **Check VITE_API_URL:**
```env
# In frontend/.env
VITE_API_URL=http://localhost:5000/api
```

3. **Check CORS settings:**
```javascript
// In backend/server.js
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

### Vite Build Errors

**Problem:** Build fails with module errors

**Solutions:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Tailwind CSS Not Working

**Problem:** Styles not applying

**Solutions:**

1. **Check tailwind.config.js content paths:**
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

2. **Verify index.css imports:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Restart dev server:**
```bash
npm run dev
```

## Authentication Issues

### Token Expired

**Problem:** `401 Unauthorized` after some time

**Solution:**
- Tokens expire after 30 days
- Log out and log back in
- Implement refresh tokens for longer sessions

### Cannot Login

**Problem:** Invalid credentials error

**Solutions:**

1. **Check email format:**
- Must be valid email address
- Case-insensitive

2. **Check password:**
- Minimum 8 characters
- Verify no extra spaces

3. **Reset password:**
- Currently no reset feature
- Create new account or check database

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error

**Solutions:**

1. **Update CORS configuration:**
```javascript
// backend/server.js
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

2. **Check request headers:**
```javascript
// Ensure Authorization header is set
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## API Issues

### Rate Limit Exceeded

**Problem:** `429 Too Many Requests`

**Solution:**
- Wait for the rate limit window to reset
- Adjust rate limits in `backend/middleware/rateLimiter.js`

### Breach Check Fails

**Problem:** Cannot check password breaches

**Solutions:**

1. **Check internet connection**
2. **Verify HIBP API is accessible:**
```bash
curl https://api.pwnedpasswords.com/range/21BD1
```

3. **Check rate limits**
4. **Try again later**

## Database Issues

### Cannot Save Passwords

**Problem:** Passwords not saving to vault

**Solutions:**

1. **Check authentication:**
- Ensure you're logged in
- Verify JWT token is valid

2. **Check MongoDB connection:**
```bash
mongosh
use securepass
db.vaults.find()
```

3. **Check validation errors:**
- Website field required
- Username field required
- Password field required

### Passwords Not Decrypting

**Problem:** Cannot view saved passwords

**Solutions:**

1. **Verify ENCRYPTION_KEY hasn't changed:**
- Changing the key makes old passwords unreadable
- Keep the same key or re-encrypt data

2. **Check database integrity:**
```bash
mongosh
use securepass
db.vaults.findOne()
```

## Performance Issues

### Slow API Responses

**Solutions:**

1. **Add database indexes:**
```javascript
// In Vault model
vaultSchema.index({ userId: 1 });
```

2. **Optimize queries:**
```javascript
// Use lean() for read-only queries
const passwords = await Vault.find({ userId }).lean();
```

3. **Enable compression:**
```javascript
// In server.js
import compression from 'compression';
app.use(compression());
```

### Frontend Slow Loading

**Solutions:**

1. **Optimize bundle size:**
```bash
npm run build
# Check dist/assets for large files
```

2. **Lazy load components:**
```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

3. **Use production build:**
```bash
npm run build
npm run preview
```

## Development Issues

### Hot Reload Not Working

**Problem:** Changes not reflecting

**Solutions:**

1. **Restart dev server:**
```bash
# Stop with Ctrl+C
npm run dev
```

2. **Clear cache:**
```bash
# Frontend
rm -rf node_modules/.vite

# Backend
rm -rf node_modules/.cache
```

3. **Check file watchers:**
```bash
# Increase file watcher limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Environment Variables Not Loading

**Problem:** `.env` values not accessible

**Solutions:**

1. **Restart server after changing .env**

2. **Check .env file location:**
- Backend: `backend/.env`
- Frontend: `frontend/.env`

3. **Verify variable names:**
- Backend: No prefix needed
- Frontend: Must start with `VITE_`

## Browser Issues

### Dark Mode Not Persisting

**Problem:** Theme resets on refresh

**Solution:**
- Check localStorage in browser DevTools
- Clear browser cache
- Check ThemeContext implementation

### Copy to Clipboard Not Working

**Problem:** Cannot copy passwords

**Solutions:**

1. **Use HTTPS in production**
2. **Check browser permissions**
3. **Try different browser**

## Getting More Help

If you're still experiencing issues:

1. **Check existing issues:** [GitHub Issues](https://github.com/yourusername/securepass-guard/issues)
2. **Create new issue:** Include error messages, steps to reproduce, environment details
3. **Check logs:** Backend console and browser DevTools console
4. **Review documentation:** README.md, API_DOCUMENTATION.md, SECURITY.md

## Useful Commands

```bash
# Check versions
node --version
npm --version
mongod --version

# View logs
# Backend: Check terminal output
# Frontend: Check browser console (F12)

# Test API
curl http://localhost:5000/api/health

# Check MongoDB
mongosh
show dbs
use securepass
show collections
db.users.find()
db.vaults.find()

# Clear everything and start fresh
rm -rf backend/node_modules frontend/node_modules
rm backend/package-lock.json frontend/package-lock.json
npm run install:all
```

## Prevention Tips

1. **Always use .env files** - Never hardcode secrets
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Use version control** - Commit working states
4. **Test before deploying** - Verify all features work
5. **Monitor logs** - Check for errors regularly
6. **Backup database** - Regular MongoDB backups
7. **Document changes** - Keep notes of modifications

---

Still stuck? Open an issue with:
- Error message (full stack trace)
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, browser)
- Screenshots if applicable
