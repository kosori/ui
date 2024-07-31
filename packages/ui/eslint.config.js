import baseConfig from '@kosori/eslint-config/base';
import reactConfig from '@kosori/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
