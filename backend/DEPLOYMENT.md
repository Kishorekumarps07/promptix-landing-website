# Quick Deployment Checklist

## 1. Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend setup"
git remote add origin https://github.com/YOUR_USERNAME/promptix-backend.git
git push -u origin main
```

## 2. Deploy on Render
1. Go to https://render.com
2. New + → Web Service
3. Connect GitHub repo: `promptix-backend`
4. Settings:
   - Build: `npm install`
   - Start: `npm start`
   - Add env vars:
     - `MONGODB_URI`: (your MongoDB connection string)
     - `NODE_ENV`: `production`

## 3. Update Frontend
In Vercel dashboard → Settings → Environment Variables:
- `VITE_API_BASE_URL`: `https://your-app.onrender.com`

## 4. Test
```bash
curl https://your-app.onrender.com/
```

Done! 🎉
