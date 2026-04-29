# ⚡ Quick Deployment Guide for Vercel

## 🚀 Deploy in 5 Minutes

### Option 1: Deploy Frontend Only (Recommended for Testing)

1. **Go to Vercel**
   - Visit https://vercel.com/new
   - Import your GitHub repository

2. **Configure Project**
   - **Root Directory:** `frontend`
   - **Framework:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Add Environment Variable**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   (Change this to your backend URL later)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! ✅

---

### Option 2: Deploy Both Frontend & Backend

#### Step 1: Deploy Backend First

1. **Create New Project in Vercel**
   - Import repository
   - **Root Directory:** `backend`
   - Framework: Other

2. **Add Environment Variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_min_32_chars
   JWT_EXPIRE=30d
   ENCRYPTION_KEY=your_32_char_key
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Deploy Backend**
   - Click Deploy
   - Copy backend URL (e.g., `https://backend-xxx.vercel.app`)

#### Step 2: Deploy Frontend

1. **Create Another Project in Vercel**
   - Import repository again
   - **Root Directory:** `frontend`
   - Framework: Vite

2. **Add Environment Variable**
   ```env
   VITE_API_URL=https://your-backend-xxx.vercel.app/api
   ```

3. **Deploy Frontend**
   - Click Deploy
   - Done! ✅

#### Step 3: Update Backend CORS

1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` with actual frontend URL
4. Redeploy backend

---

## 🗄️ MongoDB Atlas Setup (Required for Backend)

### Quick Setup:

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:** Choose Free M0 tier
3. **Create Database User:**
   - Username: `admin`
   - Password: (generate strong password)
4. **Whitelist IP:** Add `0.0.0.0/0` (allow all)
5. **Get Connection String:**
   ```
   mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/securepass
   ```
6. **Use in Vercel:** Add as `MONGODB_URI` environment variable

---

## 🔑 Generate Secure Keys

Run these commands to generate secure keys:

```bash
# JWT Secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (exactly 32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

## ✅ Deployment Checklist

### Before Deploying:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] Secure keys generated

### Backend Deployment:
- [ ] Backend project created in Vercel
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Health check passes (`/api/health`)

### Frontend Deployment:
- [ ] Frontend project created in Vercel
- [ ] Root directory set to `frontend`
- [ ] `VITE_API_URL` environment variable added
- [ ] Deployment successful
- [ ] Website loads correctly

### Post-Deployment:
- [ ] Backend CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] All features tested
- [ ] Password checker works
- [ ] Password generator works
- [ ] Breach detection works

---

## 🧪 Test Your Deployment

### Test Backend:
```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Password strength
curl -X POST https://your-backend.vercel.app/api/passwords/check-strength \
  -H "Content-Type: application/json" \
  -d '{"password":"Test123!"}'
```

### Test Frontend:
1. Visit your frontend URL
2. Go to Password Checker page
3. Test password strength analysis
4. Test breach detection
5. Test password generator

---

## 🐛 Common Issues

### Issue: "Site can't be reached"
**Solution:** Wait 2-3 minutes for deployment to complete

### Issue: CORS Error
**Solution:** Update `FRONTEND_URL` in backend environment variables

### Issue: MongoDB Connection Failed
**Solution:** Check connection string and IP whitelist (0.0.0.0/0)

### Issue: Environment Variables Not Working
**Solution:** Redeploy after adding environment variables

---

## 📞 Need Help?

1. Check deployment logs in Vercel dashboard
2. Read full guide: `VERCEL_DEPLOYMENT.md`
3. Check browser console for errors
4. Test API endpoints directly

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend:** `https://your-frontend.vercel.app`
- **Backend:** `https://your-backend.vercel.app`

Share your deployed app! 🚀

---

**Deployment Time:** ~5-10 minutes
**Cost:** Free (Vercel Free Tier + MongoDB Atlas Free Tier)
