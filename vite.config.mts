import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.{test,spec}.ts'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
  fmt: {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ['node_modules', 'dist', 'coverage', 'package-lock.json'],
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
  },
  pack: {
    entry: ['src/index.ts', 'src/por-defecto.ts'],
    format: ['esm', 'cjs'],
    dts: true,
  },
});
