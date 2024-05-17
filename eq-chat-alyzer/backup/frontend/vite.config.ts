import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    webfontDownload(['https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap']),
    react(),
    vike()
  ],
})
