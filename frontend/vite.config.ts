import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
    host: '0.0.0.0',
    hmr: {
      overlay: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.* in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks(id) {
          // Framer Motion - Animation library (separate chunk for code-splitting)
          if (id.includes('framer-motion')) {
            return 'vendor-framer';
          }

          // MUI - Material UI components (large library)
          if (id.includes('@mui/material') || id.includes('@emotion')) {
            return 'vendor-mui';
          }

          // Firebase/Genkit - Backend integration
          if (id.includes('firebase') || id.includes('@genkit-ai')) {
            return 'vendor-firebase';
          }

          // React ecosystem - Core dependencies
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor-react';
          }

          // Lucide icons - Icon library
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }

          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@mui/material',
    ],
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
  },
  clearScreen: false,
  logLevel: 'info',
});
