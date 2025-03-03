import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification and tree-shaking
    minify: 'esbuild',
    cssMinify: true,
    // Create smaller chunks for better loading performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['three', '@react-three/fiber', '@react-three/drei'],
          utils: ['lucide-react']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Generate source maps for production (helpful for debugging)
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three']
  },
  // Reduce dev server refresh latency
  server: {
    hmr: {
      overlay: false
    }
  }
});
