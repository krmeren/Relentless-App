import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  cacheDir: './node_modules/.vite',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    fs: {
      strict: true,
      allow: ['./']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
