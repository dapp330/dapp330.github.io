import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'

const publicDir = join(process.cwd(), '.output/public')
const assetsDir = join(publicDir, 'assets')

async function generateIndex() {
  try {
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
  <title>Golden Tech - Premium Engineering Partner</title>
  ${stylesCss ? `<link rel="stylesheet" href="/assets/${stylesCss}">` : ''}
</head>
<body>
  <div id="root"></div>
  ${indexJs ? `<script type="module" src="/assets/${indexJs}"></script>` : ''}
  <script type="module" src="/assets/${mainJs}"></script>
</body>
</html>`

    await writeFile(join(publicDir, 'index.html'), html)
    // Also create 404.html for GitHub Pages SPA routing
    await writeFile(join(publicDir, '404.html'), html)
    console.log('✓ Generated index.html and 404.html')
  } catch (error) {
    console.error('Error generating index.html:', error)
    process.exit(1)
  }
}

generateIndex()

