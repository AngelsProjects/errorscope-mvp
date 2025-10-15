import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@errorscope/sdk': resolve(__dirname, '../../packages/sdk/src/index.ts'),
    },
  },
  optimizeDeps: {
    include: ['@errorscope/sdk'],
  },
  server: {
    port: 3000,
  },
});
