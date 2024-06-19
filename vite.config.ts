import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


// Ensure the correct type is used
export default defineConfig({
  //base: 'import.meta.env.VITE_BASE_URL || '/'',
  base: '/my-react-portfolio/',
  plugins: [react()],
});


/*
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the current mode ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [react()],
  };
});
*/