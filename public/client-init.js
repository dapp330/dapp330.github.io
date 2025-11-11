// Standalone client initialization - completely bypasses TanStack Start
(async () => {
  try {
    console.log('Starting client initialization...');
    
    // Wait a moment for scripts to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find the index.js script (it has getRouter exported)
    const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
    const indexScript = scripts.find(s => s.src && s.src.includes('index-') && !s.src.includes('client-init'));
    
    if (!indexScript) {
      throw new Error('Could not find index.js script tag');
    }
    
    console.log('Found index script:', indexScript.src);
    
    // First, import index.js to get getRouter
    // This will also load any dependencies it needs (including React from the bundle)
    let indexModule;
    try {
      console.log('Importing index module...');
      indexModule = await import(indexScript.src);
      console.log('Index module keys:', Object.keys(indexModule));
    } catch (e) {
      console.error('Failed to import index module:', e);
      throw new Error('Could not import index module: ' + e.message);
    }
    
    // Get router from index.js
    let router;
    if (indexModule.getRouter) {
      console.log('Found getRouter, creating router...');
      router = indexModule.getRouter();
      console.log('Router created successfully');
    } else {
      throw new Error('getRouter not found in index module. Available exports: ' + Object.keys(indexModule).join(', '));
    }
    
    // The bundle (index.js) imports React from main.js
    // We need to use the SAME React instance that the components use
    // Since main.js is imported by index.js, we need to import it the same way
    let React, ReactDOM, createRoot, RouterProvider;
    
    try {
      // Find all script tags to locate main.js
      const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
      
      // Try to find main.js by looking for it in the assets
      // main.js is imported by index.js, so we need to construct its path
      const indexPath = indexScript.src;
      const basePath = indexPath.substring(0, indexPath.lastIndexOf('/'));
      
      // Try to import main.js directly - we know it exists from the build
      // The filename pattern is main-{hash}.js
      let mainModule = null;
      
      // First, try to find main.js script tag (we added it to HTML)
      const mainScript = scripts.find(s => s.src && s.src.includes('main-') && !s.src.includes('client-init'));
      
      if (mainScript) {
        console.log('Found main script tag, importing:', mainScript.src);
        mainModule = await import(mainScript.src).catch((e) => {
          console.warn('Failed to import main.js:', e);
          return null;
        });
      } else {
        // main.js is not a script tag, it's imported by index.js
        // We need to construct the path - let's try common patterns
        console.log('main.js not found as script tag, trying to import from assets...');
        
        // List all JS files in assets to find main.js
        try {
          const assetsResponse = await fetch('/assets/');
          if (assetsResponse.ok) {
            const text = await assetsResponse.text();
            const mainMatch = text.match(/main-[^"']+\.js/);
            if (mainMatch) {
              const mainPath = `/assets/${mainMatch[0]}`;
              console.log('Found main.js path:', mainPath);
              mainModule = await import(mainPath).catch(() => null);
            }
          }
        } catch (e) {
          console.warn('Could not list assets:', e);
        }
        
        // If that didn't work, try constructing the path from index.js path
        if (!mainModule) {
          // Extract hash from index.js filename and try main with same pattern
          const indexMatch = indexPath.match(/([^/]+)-([^-]+)\.js$/);
          if (indexMatch) {
            // Try main with a different hash pattern
            // Actually, we can't guess the hash, so let's try a different approach
          }
        }
      }
      
      if (mainModule) {
        console.log('Main module loaded, exports:', Object.keys(mainModule).slice(0, 20));
        
        // From the exports we saw: tt as r (React), eg (ReactDOM), y1 (RouterProvider)
        // Try to get React - exported as 'r'
        if (mainModule.r && typeof mainModule.r.createElement === 'function') {
          React = mainModule.r;
          console.log('✓ Found React as "r"');
        }
        
        // Try to get ReactDOM - exported as 'eg'
        if (mainModule.eg) {
          const egModule = mainModule.eg;
          if (typeof egModule.createRoot === 'function') {
            createRoot = egModule.createRoot;
            ReactDOM = egModule;
            console.log('✓ Found ReactDOM.createRoot from "eg"');
          } else if (egModule.default && typeof egModule.default.createRoot === 'function') {
            createRoot = egModule.default.createRoot;
            ReactDOM = egModule.default;
            console.log('✓ Found ReactDOM.createRoot from "eg.default"');
          }
        }
        
        // Check for RouterProvider - exported as 'y1' or 'RouterProvider'
        if (mainModule.y1) {
          RouterProvider = mainModule.y1;
          console.log('✓ Found RouterProvider as "y1"');
        } else if (mainModule.RouterProvider) {
          RouterProvider = mainModule.RouterProvider;
          console.log('✓ Found RouterProvider');
        }
      }
      
      // If we still don't have React, we're in trouble
      // The components won't work with a different React instance
      if (!React || !createRoot) {
        throw new Error('Could not extract React/ReactDOM from bundle. This is required for the app to work.');
      }
      
      // Get RouterProvider if we don't have it yet
      if (!RouterProvider) {
        if (indexModule.RouterProvider) {
          RouterProvider = indexModule.RouterProvider;
          console.log('Using RouterProvider from index module');
        } else {
          throw new Error('Could not find RouterProvider in bundle or index module');
        }
      }
      
    } catch (e) {
      console.error('Failed to load React/Router from bundle:', e);
      throw new Error('Could not load React/Router from bundle: ' + e.message);
    }
    
    // Wait for root element to be available
    const waitForRoot = () => {
      return new Promise((resolve, reject) => {
        // Check immediately
        let rootElement = document.getElementById('root');
        if (rootElement) {
          resolve(rootElement);
          return;
        }
        
        // If DOM is ready, check one more time
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          rootElement = document.getElementById('root');
          if (rootElement) {
            resolve(rootElement);
          } else {
            // Try creating it if it doesn't exist
            const body = document.body || document.documentElement;
            if (body) {
              const newRoot = document.createElement('div');
              newRoot.id = 'root';
              body.appendChild(newRoot);
              resolve(newRoot);
            } else {
              reject(new Error('Root element not found and cannot create it'));
            }
          }
          return;
        }
        
        // Wait for DOMContentLoaded
        const checkAndResolve = () => {
          const el = document.getElementById('root');
          if (el) {
            resolve(el);
          } else {
            // Create it if needed
            const body = document.body || document.documentElement;
            if (body) {
              const newRoot = document.createElement('div');
              newRoot.id = 'root';
              body.appendChild(newRoot);
              resolve(newRoot);
            } else {
              reject(new Error('Root element not found after DOMContentLoaded'));
            }
          }
        };
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', checkAndResolve, { once: true });
        } else {
          checkAndResolve();
        }
      });
    };
    
    const rootElement = await waitForRoot();
    console.log('Found root element:', rootElement);
    
    // Render the app
    const root = createRoot(rootElement);
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(RouterProvider, { router })
      )
    );
    console.log('✓ App initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #e5e5e5; background: #0a0a0a; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: system-ui, sans-serif;">
          <h1 style="color: #FFD700; margin-bottom: 1rem;">Lumina Kreasi Technology</h1>
          <p style="margin-bottom: 1rem;">Failed to load application.</p>
          <details style="background: #1c1c1e; padding: 1rem; border-radius: 0.5rem; text-align: left; max-width: 600px; margin-top: 1rem;">
            <summary style="cursor: pointer; margin-bottom: 0.5rem; color: #FFD700;">Error details</summary>
            <pre style="overflow: auto; font-size: 0.875rem; margin: 0; color: #e5e5e5;">${error.message}\n\n${error.stack || ''}</pre>
          </details>
        </div>
      `;
    }
  }
})();

