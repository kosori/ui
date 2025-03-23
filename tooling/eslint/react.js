import reactPlugin from 'eslint-plugin-react';
import compilerPlugin from 'eslint-plugin-react-compiler';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-compiler': compilerPlugin,
      'react-hooks': hooksPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...tailwindPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/jsx-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
];
