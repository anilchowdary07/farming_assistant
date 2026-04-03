# 🚀 Deployment Guide - AI Crop Advisory System

## ⚠️ Current Issue: 500 Error on Vercel

**Problem:** When deployed to Vercel, the `/api/recommend` endpoint returns a 500 error.

**Common Causes:**
1. Missing environment variables in Vercel
2. Import path issues with serverless functions
3. Missing dependencies
4. API key not configured

---

## ✅ Solution: Fix Vercel Deployment

### Option 1: Deploy Backend and Frontend Separately (RECOMMENDED)

This is the most reliable approach for production deployments.

#### **Backend: Deploy to Railway/Render**

Railway is easier and free-tier friendly:

1. **Go to Railway:** https://railway.app/
2. **Create Account** and click "New Project"
3. **Deploy from GitHub:**
   - Select your repository: `farming_assistant`
   - Root directory: Keep as is
4. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=your_new_gemini_key_here
   OPENWEATHER_API_KEY=your_openweather_key_here
   FLASK_ENV=production
   PORT=5000
   PYTHONPATH=./backend
   ```
5. **Configure Start Command:**
   - Go to Settings → Deploy
   - Custom Start Command: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
6. **Deploy** - Railway will auto-detect Python and install dependencies
7. **Note your backend URL:** Something like `https://your-app.railway.app`

#### **Frontend: Deploy to Vercel**

1. **Go to Vercel:** https://vercel.com/
2. **Import your GitHub repository**
3. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-app.railway.app
   ```
   (Use the Railway backend URL from above)
5. **Deploy**

---

### Option 2: Fix Vercel Monorepo Deployment

If you want to deploy both frontend and backend to Vercel:

#### **Step 1: Set Environment Variables in Vercel**

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add these variables:

```
GEMINI_API_KEY=your_new_gemini_key_here
OPENWEATHER_API_KEY=your_openweather_key_here
PYTHONPATH=./backend
```

⚠️ **IMPORTANT:** Use a NEW Gemini API key (the old one was exposed)

#### **Step 2: Verify File Structure**

Your project should look like this:
```
farming_assistant_sda/
├── api/
│   ├── index.py           ✅ Vercel serverless handler
│   └── requirements.txt   ✅ Python dependencies
├── backend/
│   ├── app.py
│   ├── services/
│   ├── models/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── vercel.json            ✅ Updated configuration
└── .vercelignore          ✅ New file
```

#### **Step 3: Update Files**

I've already updated these files:
- ✅ `api/index.py` - Better error handling
- ✅ `vercel.json` - Fixed routing configuration
- ✅ `.vercelignore` - Exclude unnecessary files
- ✅ `api/requirements.txt` - Copied dependencies

#### **Step 4: Commit and Push**

```bash
cd /Users/anilchowdary/Documents/farming_assistant_sda

# Check changes
git status

# Stage files
git add api/index.py vercel.json .vercelignore api/requirements.txt DEPLOYMENT_GUIDE.md

# Commit
git commit -m "Fix Vercel deployment: Update serverless config and add error handling"

# Push to GitHub
git push origin main
```

#### **Step 5: Redeploy on Vercel**

Vercel will automatically redeploy when you push to GitHub.

---

## 🧪 Testing Your Deployment

### Test Backend Health
```bash
# If deployed to Railway
curl https://your-app.railway.app/health

# If deployed to Vercel (combined)
curl https://your-app.vercel.app/health
```

### Test API Endpoint
```bash
curl -X POST https://your-backend-url/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {"lat": 12.9716, "lon": 77.5946, "name": "Bangalore, Karnataka"},
    "season": "Kharif",
    "budget": 50000,
    "land_size": 2.5,
    "land_unit": "acres",
    "harvest_timeline": "3-4 months",
    "soil_type": "loamy",
    "irrigation": "drip"
  }'
```

---

## 🔍 Debugging 500 Errors

### Check Vercel Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments" → Click latest deployment
4. Click "Functions" → Click on your function
5. View logs to see the actual error

### Common Issues and Fixes

#### **Issue 1: Environment Variables Not Set**
**Error:** `GEMINI_API_KEY not found in environment variables`
**Fix:** Add environment variables in Vercel dashboard (Settings → Environment Variables)

#### **Issue 2: Import Errors**
**Error:** `ModuleNotFoundError: No module named 'services'`
**Fix:** 
- Set `PYTHONPATH=./backend` in Vercel environment variables
- Verify `api/index.py` has correct sys.path modifications

#### **Issue 3: Missing Dependencies**
**Error:** `ModuleNotFoundError: No module named 'google.generativeai'`
**Fix:** Ensure `api/requirements.txt` exists with all dependencies

#### **Issue 4: API Timeout**
**Error:** Function timeout (10 seconds default on Vercel free tier)
**Fix:** 
- Upgrade to Vercel Pro (60 second timeout)
- OR deploy backend separately to Railway (no timeout limits)

#### **Issue 5: Cold Start Issues**
**Error:** First request is slow or fails
**Fix:** This is normal for serverless. Consider:
- Using a dedicated backend (Railway/Render)
- Adding a warm-up function
- Implementing retry logic in frontend

---

## 📊 Deployment Options Comparison

| Feature | Vercel (Combined) | Separate (Railway + Vercel) |
|---------|-------------------|----------------------------|
| Setup Complexity | ⭐⭐⭐ Harder | ⭐⭐ Easy |
| Free Tier | ⚠️ 10s timeout | ✅ No timeout (Railway) |
| Cold Starts | ❌ Yes | ✅ No (Railway always on) |
| Backend Logs | ⚠️ Limited | ✅ Full logs |
| Scalability | ⭐⭐ Limited | ⭐⭐⭐ Better |
| Best For | Small demos | Production use |

**Recommendation:** Use **Railway (backend) + Vercel (frontend)** for production.

---

## 🎯 Quick Fix Commands

If you've already updated the files, just push:

```bash
cd /Users/anilchowdary/Documents/farming_assistant_sda

# Ensure you have the latest fixes
git status

# Add environment variables in Vercel dashboard first!
# Then push to trigger redeploy
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

---

## 🆘 Still Having Issues?

### Local Testing
Test the backend locally first:

```bash
cd backend
source venv/bin/activate
python app.py

# In another terminal
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d @test_data.json
```

If it works locally but not on Vercel → Deploy backend separately to Railway

### Get Help
- Check Vercel function logs for exact error
- Share the error message
- Verify all environment variables are set correctly

---

## ✅ Final Checklist

- [ ] Generate NEW Gemini API key (old one was exposed)
- [ ] Revoke old Gemini API key
- [ ] Add `GEMINI_API_KEY` to deployment environment
- [ ] Add `OPENWEATHER_API_KEY` to deployment environment
- [ ] Push updated code to GitHub
- [ ] Check Vercel deployment logs
- [ ] Test `/health` endpoint
- [ ] Test `/api/recommend` endpoint
- [ ] Verify frontend can communicate with backend

---

**Recommended Approach:** Deploy backend to Railway and frontend to Vercel for best results! 🚀
