import { defineConfig } from 'vite'

export default defineConfig({
  base: '/phone_dismandil/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 2048,
  },
})
