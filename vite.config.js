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
        timezoneTable: resolve(root, 'timezone-table.html'),
        timezoneConverter: resolve(root, 'timezone-converter.html'),
        indexJa: resolve(root, 'ja/index.html'),
        calendarJa: resolve(root, 'ja/calendar.html'),
        timezoneTableJa: resolve(root, 'ja/timezone-table.html'),
        timezoneConverterJa: resolve(root, 'ja/timezone-converter.html'),
        notfound: resolve(root, '404.html'),
        terms: resolve(root, 'terms.html'),
      },
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    setupFiles: ['src/test/unit.setup.js'],
  }
});