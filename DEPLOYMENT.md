# Deployment Guide

This project can be deployed to multiple platforms. Choose the one that best fits your needs.

## Firebase Hosting Deployment

This project is configured to deploy to Firebase Hosting.

### Prerequisites

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

### Firebase Console Setup

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" or select an existing project
   - Follow the setup wizard
   - Note your project ID

2. **Initialize Firebase in your project:**
   ```bash
   firebase init hosting
   ```
   When prompted:
   - Select "Use an existing project" and choose your Firebase project
   - Public directory: `.output/public` (already configured in `firebase.json`)
   - Configure as single-page app: Yes
   - Set up automatic builds: No (or Yes if you want CI/CD)
   - Overwrite `index.html`: No

3. **Build your application:**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```

5. **Access your site:**
   - Your site will be available at `https://YOUR-PROJECT-ID.web.app` or `https://YOUR-PROJECT-ID.firebaseapp.com`
   - You can also set up a custom domain in Firebase Console → Hosting → Add custom domain

### Firebase Configuration

The `firebase.json` file is already configured with:
- Public directory: `.output/public`
- SPA routing support (all routes redirect to `index.html`)
- Cache headers for static assets

---

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions" (not "Deploy from a branch")
   - Save the settings

2. **Push to main branch:**
   - The GitHub Actions workflow will automatically trigger on push to `main`
   - The workflow will:
     - Build the TanStack Start application
     - Deploy the static files from `.output/public` to GitHub Pages

3. **Access your site:**
   - Your site will be available at `https://dapp330.github.io` (or your username/organization)

### Manual Deployment

You can also trigger the deployment manually:
- Go to Actions tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow"

---

## Build Output

The build process outputs static files to `.output/public`, which can be deployed to any static hosting service.

## Troubleshooting

### Firebase
- If deployment fails, check the Firebase CLI output for error messages
- Ensure you're logged in: `firebase login`
- Verify your project ID: `firebase projects:list`
- Make sure you've run `npm run build` before deploying

### GitHub Pages
- If the deployment fails, check the Actions tab for error messages
- Ensure GitHub Pages is enabled with "GitHub Actions" as the source
- Make sure the workflow file is in `.github/workflows/deploy.yml`

