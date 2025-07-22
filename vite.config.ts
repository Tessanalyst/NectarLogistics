import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // root directory (same as where index.html is)
  build: {
    outDir: 'dist/client',
  }
});
