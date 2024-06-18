import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-react-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'build', // Output directory
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      output: {
        // Custom output options if needed
      },
    },
  }
})
