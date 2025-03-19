// filepath: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import next from 'vite-plugin-next';

export default defineConfig({
  plugins: [react(), next()],
});