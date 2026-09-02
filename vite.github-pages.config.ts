import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const repositoryPath = '/wild-strokes-game-ui-portfolio';

export default defineConfig({
  root: 'github-pages',
  base: `${repositoryPath}/`,
  publicDir: '../public',
  define: {
    'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(repositoryPath),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: '../dist/github-pages',
    emptyOutDir: true,
  },
});

