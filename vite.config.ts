import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Babel configuration for faster builds
    babel: {
      babelrc: false,
      configFile: false,
      plugins: []
    }
  })],
  build: {
    // Enable minification and tree-shaking
    minify: 'esbuild',
    cssMinify: true,
    // Disable chunk size warnings 
    chunkSizeWarningLimit: 2000,
    // Disable sourcemaps for production build to speed up build time
    sourcemap: false,
    // Empty outDir before building
    emptyOutDir: true,
    // Use faster esbuild for transformations
    cssTarget: 'esnext',
    target: 'esnext'
  },
  // Configure optimizeDeps for faster builds
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  // Reduce dev server refresh latency
  server: {
    hmr: {
      overlay: false
    }
  },
  // Use esbuild to transpile TypeScript
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        target: 'esnext'
      }
    }
  }
});
