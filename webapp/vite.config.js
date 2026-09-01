const { defineConfig } = require('vite')

// Export a config that dynamically imports ESM plugins so Node runners that load
// the config with require() don't fail when plugins are published as ESM.
module.exports = defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default
  const { VitePWA } = await import('vite-plugin-pwa')

  return {
    // Use relative paths so the site works when served from GitHub Pages or any subpath
    base: './',
    plugins: [
      reactPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'icon.svg'],
        manifest: {
          name: 'Responsive Webapp',
          short_name: 'Webapp',
          description: 'Simple responsive React app packaged as a PWA',
          theme_color: '#2563eb',
          icons: [
            {
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    server: {
      port: 5173
    }
  }
})
