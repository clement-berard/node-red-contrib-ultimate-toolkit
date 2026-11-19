import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      // Editor code runs in the browser and is not unit-tested
      exclude: ['src/**/__tests__/**', 'src/**/*.test.ts', 'src/types/**'],
      thresholds: {
        statements: 95,
        lines: 95,
        functions: 95,
        branches: 85,
      },
    },
  },
});
