import { readdir, writeFile, readFile, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'

const publicDir = join(process.cwd(), '.output/public')
const assetsDir = join(publicDir, 'assets')
const indexPath = join(publicDir, 'index.html')

async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function generateIndex() {
  try {
    // Check if Nitro already generated an index.html (prerendered)
    const exists = await fileExists(indexPath)
    if (exists) {
      const existing = await readFile(indexPath, 'utf-8')
      // If it's a full HTML document (not just our minimal shell), use it
      if (existing.includes('<body') && existing.length > 500) {
        console.log('✓ Using prerendered index.html from Nitro')
        // Still create 404.html for SPA routing
        await writeFile(join(publicDir, '404.html'), existing)
        console.log('✓ Generated 404.html for SPA routing')
        return
      }
    }

    // Find the main JS and CSS files
    const files = await readdir(assetsDir)
    const mainJs = files.find(f => f.startsWith('main-') && f.endsWith('.js'))
    const stylesCss = files.find(f => f.startsWith('styles-') && f.endsWith('.css'))
    const indexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'))

    if (!mainJs) {
      throw new Error('Could not find main JS file')
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lumina Kreasi Technology - Premium Engineering Partner</title>
  ${stylesCss ? `<link rel="stylesheet" href="/assets/${stylesCss}">` : ''}
</head>
<body>
  <div id="root"></div>
  ${indexJs ? `<script type="module" src="/assets/${indexJs}"></script>` : ''}
  <script type="module" src="/assets/${mainJs}"></script>
</body>
</html>`

    await writeFile(indexPath, html)
    // Also create 404.html for SPA routing
    await writeFile(join(publicDir, '404.html'), html)
    console.log('✓ Generated index.html and 404.html')
  } catch (error) {
    console.error('Error generating index.html:', error)
    process.exit(1)
  }
}

generateIndex()

