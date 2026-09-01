import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
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
  },
  build: {
    // Use esbuild for minification in CI to avoid rollup-terser requiring serialize-javascript
    minify: 'esbuild'
  }
})
