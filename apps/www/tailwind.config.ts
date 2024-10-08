import type { Config } from 'tailwindcss';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

import baseConfig from '@kosori/tailwind-config/web';

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    '../../packages/ui/**/*.tsx',
    '../../node_modules/fumadocs-ui/dist/**/*.js',
    './content/**/*.{md,mdx}',
    './src/mdx-components.{ts,tsx}',
  ],
  presets: [createPreset(), baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
