import { fileURLToPath } from 'node:url';

const config = {
  plugins: {
    [fileURLToPath(new URL('./postcss-drop-highlight.mjs', import.meta.url))]:
      {},
    '@tailwindcss/postcss': {},
  },
};

export default config;
