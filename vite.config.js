
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Performance optimizations
  build: {
    // Code splitting for better loading
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mantine/core', '@mantine/hooks'],
          animations: ['framer-motion']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Target ES2020 for better compatibility
    target: 'es2020',
    // Force minification with esbuild instead of terser
    minify: 'esbuild',
    // Disable sourcemaps to reduce build complexity
    sourcemap: false
  },
  
  // Development server optimization
  server: {
    hmr: {
      overlay: false // Disable error overlay for better dev experience
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      'framer-motion'
    ]
  }
})
