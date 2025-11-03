import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      include: ['src/**/*.{js,jsx}', 'scripts/**/*.js'],
      exclude: [
        'src/main.jsx',
        'src/**/*.test.{js,jsx}',
        'scripts/**/*.test.js',
        'scripts/validate-data.js',
        'scripts/geocode.js',
        'node_modules/**',
      ],
    },
  },
});
