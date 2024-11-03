import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',   
        gifts: 'gifts.html',
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
});