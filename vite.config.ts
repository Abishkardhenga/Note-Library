import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split third-party dependencies into separate chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'react-hot-toast'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'vendor-utils': ['date-fns', 'gsap', 'canvas-confetti'],
          'vendor-editor': ['@tiptap/react', '@tiptap/starter-kit', 'react-quill']
        }
      }
    },
    // Optimize CSS splitting
    cssCodeSplit: true,
    // Enable source maps for debugging
    sourcemap: true
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ]
  }
});