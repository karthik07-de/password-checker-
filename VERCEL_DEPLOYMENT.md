# 🚀 Vercel Deployment Guide

## Overview

This guide will help you deploy SecurePass Guard to Vercel. The application consists of two parts:
1. **Frontend** (React + Vite)
2. **Backend** (Node.js + Express API)

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Repository** - Your code should be on GitHub
3. **MongoDB Atlas** - For database (free tier available)

---

## 🗄️ Step 1: Setup MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a new cluster (free M0 tier)

### 1.2 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `securepass`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/securepass?retryWrites=true&w=majority
```

### 1.3 Whitelist IP Addresses
1. Go to Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

---

## 🔧 Step 2: Deploy Backend to Vercel

### 2.1 Import Backend Project
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Important:** Set the root directory to `backend`
4. Click "Continue"

### 2.2 Configure Backend Environment Variables
Add these environment variables in Vercel:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=30d
ENCRYPTION_KEY=your_32_character_encryption_key_exactly
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Generate Secure Keys:**
```bash
# For JWT_SECRET (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# For ENCRYPTION_KEY (exactly 32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2.3 Deploy Backend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://your-backend.vercel.app`)

### 2.4 Test Backend
Visit: `https://your-backend.vercel.app/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "SecurePass Guard API is running",
  "timestamp": "...",
  "uptime": ...,
  "environment": "production",
  "database": "connected"
}
```

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Import Frontend Project
1. Go to https://vercel.com/new
2. Import your GitHub repository again
3. **Important:** Set the root directory to `frontend`
4. Click "Continue"

### 3.2 Configure Frontend Environment Variables
Add this environment variable:

```env
VITE_API_URL=https://your-backend.vercel.app/api
```

Replace `your-backend.vercel.app` with your actual backend URL from Step 2.3

### 3.3 Configure Build Settings
Vercel should auto-detect Vite, but verify:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.4 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be live at `https://your-frontend.vercel.app`

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend Endpoints

**Health Check:**
```bash
curl https://your-backend.vercel.app/api/health
```

**Password Strength:**
```bash
curl -X POST https://your-backend.vercel.app/api/passwords/check-strength \
  -H "Content-Type: application/json" \
  -d '{"password":"Test123!"}'
```

**Password Generator:**
```bash
curl -X POST https://your-backend.vercel.app/api/passwords/generate \
  -H "Content-Type: application/json" \
  -d '{"length":16,"uppercase":true,"lowercase":true,"numbers":true,"symbols":true}'
```

### 4.2 Test Frontend
1. Visit your frontend URL
2. Navigate to Password Checker
3. Test password strength analysis
4. Test breach detection
5. Test password generator

---

## 🔄 Step 5: Update Backend CORS

After deploying frontend, update backend environment variable:

1. Go to your backend project in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to your actual frontend URL
4. Redeploy backend

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Check `FRONTEND_URL` in backend environment variables
2. Make sure it matches your frontend URL exactly
3. Redeploy backend after changing

### Issue: MongoDB Connection Failed
**Error:** `Database: disconnected`

**Solution:**
1. Check MongoDB Atlas connection string
2. Verify IP whitelist (0.0.0.0/0)
3. Check database user permissions
4. Verify password doesn't contain special characters that need encoding

### Issue: Environment Variables Not Working
**Error:** `undefined` values in API responses

**Solution:**
1. Check all environment variables are set in Vercel
2. Make sure variable names match exactly
3. Redeploy after adding variables

### Issue: Build Failed
**Error:** Build fails during deployment

**Solution:**
1. Check `package.json` has all dependencies
2. Verify Node.js version compatibility
3. Check build logs for specific errors

### Issue: API Routes Not Working
**Error:** 404 on API calls

**Solution:**
1. Verify `VITE_API_URL` in frontend environment variables
2. Check backend URL is correct
3. Test backend health endpoint directly

---

## 📝 Environment Variables Checklist

### Backend Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=mongodb+srv://...`
- [ ] `JWT_SECRET=...` (32+ characters)
- [ ] `JWT_EXPIRE=30d`
- [ ] `ENCRYPTION_KEY=...` (exactly 32 characters)
- [ ] `FRONTEND_URL=https://your-frontend.vercel.app`

### Frontend Environment Variables
- [ ] `VITE_API_URL=https://your-backend.vercel.app/api`

---

## 🔒 Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong JWT_SECRET generated
- [ ] Strong ENCRYPTION_KEY generated
- [ ] CORS configured correctly
- [ ] Environment variables set (not hardcoded)
- [ ] `.env` files not committed to Git

---

## 🚀 Deployment Commands

### Redeploy Backend
```bash
# From project root
cd backend
vercel --prod
```

### Redeploy Frontend
```bash
# From project root
cd frontend
vercel --prod
```

### Deploy Both (from root)
```bash
# Deploy backend
vercel --cwd backend --prod

# Deploy frontend
vercel --cwd frontend --prod
```

---

## 📊 Post-Deployment

### 1. Custom Domain (Optional)
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 2. Analytics
Vercel provides built-in analytics:
- Page views
- Performance metrics
- Error tracking

### 3. Monitoring
Monitor your deployment:
- Check Vercel dashboard for errors
- Monitor MongoDB Atlas metrics
- Set up alerts for downtime

---

## 🎯 Quick Deploy Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable set
- [ ] CORS updated with frontend URL
- [ ] All features tested
- [ ] Custom domain configured (optional)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test API endpoints directly
4. Verify environment variables
5. Check MongoDB Atlas connection

---

## 🎉 Success!

Your SecurePass Guard application should now be live:
- **Frontend:** https://your-frontend.vercel.app
- **Backend:** https://your-backend.vercel.app
- **API Docs:** https://your-backend.vercel.app/api

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

**Made with ❤️ by Karthik**
