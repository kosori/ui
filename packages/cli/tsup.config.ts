import { defineConfig, Options } from 'tsup';

const config: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  sourcemap: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
};

export default defineConfig(config);
