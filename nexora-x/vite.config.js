import { defineConfig } from 'vite'

export default defineConfig({
  server: { host: '0.0.0.0', port: 5300 },
  preview: { host: '0.0.0.0', port: 4173 },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'], motion: ['gsap', 'lenis'] }
      }
    }
  }
})
