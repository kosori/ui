import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

import base from './base';

export default {
  content: base.content,
  presets: [base],
  theme: {
    borderRadius: {
      none: '0px',
      sm: 'calc(var(--radius) - 3px)',
      DEFAULT: 'var(--radius)',
      md: 'var(--radius)',
      lg: 'calc(var(--radius) + 3px)',
      xl: 'calc(var(--radius) + 6px)',
      '2xl': 'calc(var(--radius) + 9px)',
      '3xl': 'calc(var(--radius) + 12px)',
      full: '9999px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        swing: {
          '15%': { transform: 'translateX(5px)' },
          '30%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(3px)' },
          '80%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        swing: 'swing 1s ease 1',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
