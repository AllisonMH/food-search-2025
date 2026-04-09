# Deploying Atlanta Food Resources to Vercel

This guide will walk you through deploying the Atlanta Food Resources app to Vercel, a modern hosting platform optimized for frontend frameworks and static sites.

## Why Vercel?

- **Zero Configuration**: Automatically detects Vite and configures the build
- **Global CDN**: Fast performance worldwide with edge caching
- **Automatic HTTPS**: Free SSL certificates included
- **Preview Deployments**: Every pull request gets its own preview URL
- **Easy Custom Domains**: Simple DNS configuration for custom domains
- **Serverless Functions**: Future expansion capability for backend features
- **Free Tier**: Generous free tier perfect for community projects
- **Automatic Deployments**: Push to GitHub and deploy automatically

## Prerequisites

Before you begin, ensure you have:

1. A [GitHub account](https://github.com) (you already have this!)
2. A [Vercel account](https://vercel.com/signup) (free - sign up with GitHub)
3. Push access to the food-search-2025 repository

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

#### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Follow the onboarding prompts

#### Step 2: Import Your Project

1. From your Vercel dashboard, click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find and select the `AllisonMH/food-search-2025` repository
   - If you don't see it, click "Adjust GitHub App Permissions" to grant access
4. Click **"Import"**

#### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Root Directory** | `./` (leave as default) |

**Environment Variables**: None required for basic deployment

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for the build to complete
3. You'll see a success screen with your deployment URL!

#### Step 5: Get Your Live URL

Your app is now live at:
```
https://food-search-2025-<random-id>.vercel.app
```

You can customize this URL or add a custom domain (see below).

---

### Option 2: Deploy via Vercel CLI (For Advanced Users)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your GitHub account.

#### Step 3: Deploy from Your Local Repository

```bash
# Navigate to your project directory
cd food-search-2025

# Run deployment
vercel
```

The CLI will ask a few questions:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) / Yes (subsequent deploys)
- **What's your project's name?** → `food-search-2025` (or your preference)
- **In which directory is your code located?** → `./`

Vercel will automatically detect the Vite configuration and deploy!

#### Step 4: Deploy to Production

For production deployments:
```bash
vercel --prod
```

---

## Configuring Custom Domain (Optional)

### Step 1: Add Domain in Vercel

1. Go to your project in the Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `atlantafood.org` or `food.yourdomain.com`)
4. Click **"Add"**

### Step 2: Configure DNS

Vercel will provide DNS records to add. Two options:

**Option A: Using Vercel Nameservers (Recommended)**
1. Vercel provides nameserver addresses
2. Update nameservers at your domain registrar
3. DNS propagates in 24-48 hours

**Option B: Using A/CNAME Records**
1. Add the A record or CNAME record Vercel provides
2. Point to: `cname.vercel-dns.com`
3. DNS propagates in minutes to hours

### Step 3: Verify

Once DNS propagates, your app will be live at your custom domain with automatic HTTPS!

---

## Automatic Deployments

Vercel automatically deploys your app when you push to GitHub:

- **Production Branch** (main/master): Deploys to production URL
- **Other Branches**: Creates preview deployments with unique URLs
- **Pull Requests**: Automatic preview links in PR comments

### Configure Production Branch

1. Go to **Settings** → **Git** in Vercel dashboard
2. Set **Production Branch** to `main` (or your default branch)
3. Save changes

Now every push to `main` triggers a production deployment!

---

## Environment Variables (For Future Features)

If you add backend features later (APIs, analytics, etc.):

1. Go to **Settings** → **Environment Variables**
2. Add variables for:
   - **Production**: Live environment
   - **Preview**: Preview deployments
   - **Development**: Local development (optional)
3. Click **"Save"**

---

## Troubleshooting

### Build Fails on Vercel

**Issue**: Build command fails

**Solution**:
1. Check the build logs in Vercel dashboard
2. Verify Node.js version (Vercel uses Node 18+ by default)
3. Try running `npm run build` locally to reproduce
4. Check for missing environment variables

### 404 on Routes (e.g., /resources)

**Issue**: Direct navigation to `/resources` shows 404

**Solution**: Already handled by `vercel.json` rewrites configuration. If still occurring:
1. Verify `vercel.json` exists in project root
2. Check that rewrites configuration matches the template
3. Redeploy after making changes

### Custom Domain Not Working

**Issue**: Domain shows "Domain not found"

**Solution**:
1. Wait 24-48 hours for DNS propagation (for nameservers)
2. Verify DNS records at your registrar match Vercel's instructions
3. Check DNS propagation: Use [whatsmydns.net](https://www.whatsmydns.net/)
4. Ensure CNAME record points to `cname.vercel-dns.com`

### App Shows Blank Page

**Issue**: Deployment succeeds but app doesn't load

**Solution**:
1. Check browser console for errors (F12)
2. Verify build completed successfully in Vercel logs
3. Check that `dist` folder is being deployed (not `build` or other)
4. Ensure `vercel.json` output directory matches Vite output: `dist`

---

## Vercel Configuration Reference

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

**Explanation**:
- `rewrites`: Handles client-side routing (redirects all routes to index.html)
- `buildCommand`: Command to build the app
- `outputDirectory`: Where Vite outputs the built files
- `framework`: Tells Vercel this is a Vite project
- `installCommand`: How to install dependencies

---

## Next Steps After Deployment

1. **Test Your Deployment**: Visit your Vercel URL and test all features
2. **Update README**: Add your Vercel URL to the README
3. **Monitor Analytics**: Check Vercel Analytics (if enabled) to see usage
4. **Set Up Alerts**: Configure Vercel to notify you of failed deployments
5. **Add Custom Domain**: If you have one, follow the custom domain steps above

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel Guide](https://vercel.com/guides/deploying-vite-with-vercel)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support) (free tier includes community support)

---

## Migration Checklist

- [ ] Sign up for Vercel account
- [ ] Import GitHub repository to Vercel
- [ ] Verify build settings
- [ ] Deploy to Vercel
- [ ] Test all features on Vercel URL
- [ ] (Optional) Configure custom domain
- [ ] (Optional) Set up automatic deployments
- [ ] Update project documentation with new URL
- [ ] Share new URL with users!

---

**Need Help?**

If you encounter issues during deployment:
1. Check Vercel's build logs for error messages
2. Consult the troubleshooting section above
3. Open an issue in the GitHub repository
4. Email: info@kolorkodestudios.com

**Happy Deploying! 🚀**
