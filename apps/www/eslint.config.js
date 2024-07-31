import baseConfig, { restrictEnvAccess } from '@kosori/eslint-config/base';
import nextjsConfig from '@kosori/eslint-config/nextjs';
import reactConfig from '@kosori/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
