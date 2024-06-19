import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-react-portfolio/',
  publicDir: 'public',
  plugins: [react()],
});

