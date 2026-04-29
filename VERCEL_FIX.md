# 🔧 Fix Vercel Deployment Issue

## Problem
You're seeing this error:
```json
{
  "experimentalServices": {
    "frontend": {"entrypoint": "frontend","routePrefix": "/","framework": "vite"},
    "backend": {"entrypoint": "backend","routePrefix": "/_/backend"}
  }
}
```

This means Vercel is detecting your project as a monorepo but can't deploy it correctly.

---

## ✅ Solution: Deploy as Separate Projects

You need to deploy **frontend** and **backend** as **two separate Vercel projects**.

---

## 📝 Step-by-Step Fix

### Step 1: Deploy Backend

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Click "Add New" → "Project"

2. **Import Your Repository**
   - Select your GitHub repository: `password-checker-`
   - Click "Import"

3. **⚠️ IMPORTANT: Configure Root Directory**
   - Click "Edit" next to "Root Directory"
   - Type: `backend`
   - Click "Continue"

4. **Configure Build Settings**
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/securepass
   JWT_SECRET=your_generated_secret_key_min_32_characters
   JWT_EXPIRE=30d
   ENCRYPTION_KEY=your_32_character_encryption_key_here
   FRONTEND_URL=https://your-frontend-will-be-here.vercel.app
   ```

   **Generate Keys:**
   ```bash
   # JWT Secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Encryption Key
   node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
   ```

6. **Deploy Backend**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Backend deployed!
   - **Copy your backend URL** (e.g., `https://password-checker-backend.vercel.app`)

7. **Test Backend**
   Visit: `https://your-backend-url.vercel.app/api/health`
   
   You should see:
   ```json
   {
     "status": "ok",
     "message": "SecurePass Guard API is running"
   }
   ```

---

### Step 2: Deploy Frontend

1. **Create Another Project**
   - Go to https://vercel.com/new
   - Import the **same repository** again
   - Click "Import"

2. **⚠️ IMPORTANT: Configure Root Directory**
   - Click "Edit" next to "Root Directory"
   - Type: `frontend`
   - Click "Continue"

3. **Configure Build Settings**
   - **Framework Preset:** Vite (should auto-detect)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variable**
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   
   Replace `your-backend-url` with the actual backend URL from Step 1.6

5. **Deploy Frontend**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Frontend deployed!
   - **Copy your frontend URL** (e.g., `https://password-checker-frontend.vercel.app`)

---

### Step 3: Update Backend CORS

1. **Go to Backend Project in Vercel**
   - Dashboard → Select your backend project
   - Go to "Settings" → "Environment Variables"

2. **Update FRONTEND_URL**
   - Find `FRONTEND_URL` variable
   - Click "Edit"
   - Update with your actual frontend URL from Step 2.5
   - Click "Save"

3. **Redeploy Backend**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Wait for redeployment

---

## 🧪 Test Your Deployment

### Test Backend API:
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Password strength
curl -X POST https://your-backend-url.vercel.app/api/passwords/check-strength \
  -H "Content-Type: application/json" \
  -d '{"password":"Test123!"}'
```

### Test Frontend:
1. Visit your frontend URL
2. Click "Password Checker"
3. Type a password
4. Click "Check for Data Breaches"
5. Should work! ✅

---

## 🗄️ MongoDB Atlas Setup (If Not Done)

1. **Create Account:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:** Free M0 tier
3. **Create Database User:**
   - Database Access → Add New Database User
   - Username: `admin`
   - Password: (generate strong password)
   - Save

4. **Whitelist All IPs:**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Confirm

5. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `securepass`

---

## 📋 Deployment Checklist

### Backend:
- [ ] New Vercel project created
- [ ] Root directory set to `backend`
- [ ] MongoDB Atlas connection string added
- [ ] JWT_SECRET generated and added
- [ ] ENCRYPTION_KEY generated and added
- [ ] Deployed successfully
- [ ] Health check passes
- [ ] Backend URL copied

### Frontend:
- [ ] New Vercel project created (separate from backend)
- [ ] Root directory set to `frontend`
- [ ] VITE_API_URL added with backend URL
- [ ] Deployed successfully
- [ ] Website loads
- [ ] Frontend URL copied

### Post-Deployment:
- [ ] FRONTEND_URL updated in backend
- [ ] Backend redeployed
- [ ] Password checker tested
- [ ] Password generator tested
- [ ] Breach detection tested

---

## 🎯 Project Names in Vercel

To keep things organized, name your projects:
- **Backend:** `password-checker-backend` or `securepass-api`
- **Frontend:** `password-checker-frontend` or `securepass-app`

---

## 🐛 Common Errors & Solutions

### Error: "Root directory not found"
**Solution:** Make sure you typed `backend` or `frontend` exactly (lowercase)

### Error: "Build failed"
**Solution:** 
- Check if `node_modules` exists in the folder
- Verify `package.json` exists
- Check build logs for specific error

### Error: "CORS policy blocked"
**Solution:**
- Update `FRONTEND_URL` in backend environment variables
- Redeploy backend
- Clear browser cache

### Error: "MongoDB connection failed"
**Solution:**
- Check connection string format
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials

---

## 📸 Visual Guide

### Backend Deployment:
```
Vercel Dashboard
  → New Project
  → Import Repository
  → Root Directory: backend ← IMPORTANT!
  → Add Environment Variables
  → Deploy
```

### Frontend Deployment:
```
Vercel Dashboard
  → New Project
  → Import Repository (same repo)
  → Root Directory: frontend ← IMPORTANT!
  → Add Environment Variable (VITE_API_URL)
  → Deploy
```

---

## ✅ Success Indicators

### Backend is working when:
- ✅ Health endpoint returns JSON
- ✅ No CORS errors in browser console
- ✅ API endpoints respond correctly

### Frontend is working when:
- ✅ Website loads without errors
- ✅ Password checker shows strength meter
- ✅ Breach detection button works
- ✅ Password generator creates passwords

---

## 🎉 Final Result

You should have:
- **Backend URL:** `https://your-backend.vercel.app`
- **Frontend URL:** `https://your-frontend.vercel.app`
- **Both working together!** 🚀

---

## 📞 Still Having Issues?

1. Check Vercel deployment logs
2. Check browser console (F12)
3. Verify all environment variables
4. Test backend API directly
5. Make sure MongoDB is connected

---

**Remember:** Deploy as **TWO SEPARATE PROJECTS**, not one monorepo!
