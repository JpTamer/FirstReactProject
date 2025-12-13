# Deployment Guide

## Environment Variables Setup ✅ DONE

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

For production on Vercel:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_secret_key_here
PORT=3000
```

## Deploy Backend to Render

1. Go to https://render.com and sign in with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `JpTamer/FirstReactProject`
4. Configure:
   - **Name**: amalfi-backend (or any name)
   - **Root Directory**: `Backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   
5. Add Environment Variables:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_9cvkqiam5xtK@ep-dawn-cake-ah38af4g-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `JWT_SECRET` = `your-secret-key-change-this-in-production`
   - `PORT` = `3000` (Render will override this automatically)

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL: `https://amalfi-backend.onrender.com` (or similar)

## Update Frontend on Vercel

1. Go to your Vercel project settings: https://vercel.com/dashboard
2. Go to Settings → Environment Variables
3. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (from step 8 above)
   - **Environment**: Production, Preview, Development
4. Click "Save"
5. Go to Deployments tab
6. Click "Redeploy" on the latest deployment

## Test Your Live Site

Visit: https://amalfi-lilac.vercel.app/

Everything should now work with the deployed backend!

## Important Notes

- ✅ Database credentials are now in environment variables (not in code)
- ✅ .env files are in .gitignore (not committed to GitHub)
- ✅ Frontend uses VITE_API_URL for all axios calls
- ✅ Backend uses DATABASE_URL and JWT_SECRET from environment
- ✅ All localhost references have been replaced

## Free Tier Limitations

- **Render**: Backend may sleep after 15 minutes of inactivity (first request will be slow)
- **Vercel**: Frontend has unlimited bandwidth for hobby projects
- **Neon**: 500MB storage limit on free tier

## Future Improvements

- Add CORS whitelist in production (currently allows all origins)
- Use stronger JWT_SECRET (generate with `openssl rand -base64 32`)
- Add rate limiting to prevent abuse
- Enable HTTPS only in production
