import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add base path for Vercel deployment
  base: '/',
  // Configure resolve for better path handling
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Enable minification 
    minify: 'esbuild',
    cssMinify: true,
    // Set conservative targets for broader compatibility
    target: 'es2015',
    // Disable sourcemaps for production build
    sourcemap: false,
    // Empty outDir before building
    emptyOutDir: true,
    // Ensure correct output directory for Vercel
    outDir: 'dist',
    // Set reasonable chunk size
    chunkSizeWarningLimit: 1000
  },
  // Configure optimizeDeps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@react-three/fiber',
      '@react-three/drei',
      'lucide-react'
    ]
  },
  // Vercel compatible server config
  server: {
    port: 3000,
    host: true,
    strictPort: true
  }
});
