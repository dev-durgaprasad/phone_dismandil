
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages repository path
  base: '/phone_dismandil/',

  server: {
    host: '0.0.0.0',
    port: 5300,
    strictPort: true
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true
  },

  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,

    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['gsap', 'lenis']
        }
      }
    }
  }
})
