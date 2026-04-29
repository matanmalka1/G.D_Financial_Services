import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      optimizeDeps: {
        include: ['sonner'],
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
              ui: ['@headlessui/react', '@radix-ui/react-select', 'lucide-react', 'sonner'],
              phone: ['libphonenumber-js'],
            },
          },
        },
      },
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
