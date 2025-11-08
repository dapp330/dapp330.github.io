# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

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

## Manual Deployment

You can also trigger the deployment manually:
- Go to Actions tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow"

## Build Output

The build process outputs static files to `.output/public`, which is then deployed to GitHub Pages.

## Troubleshooting

- If the deployment fails, check the Actions tab for error messages
- Ensure GitHub Pages is enabled with "GitHub Actions" as the source
- Make sure the workflow file is in `.github/workflows/deploy.yml`

