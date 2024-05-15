import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        calendar: resolve(root, 'calendar.html'),
      },
    },
  },
});