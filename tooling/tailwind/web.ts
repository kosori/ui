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
        'collapsible-down': {
          from: { height: '0' },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },
        'collapsible-up': {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: { height: '0' },
        },
        flash: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        grow: {
          '0%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0.3)' },
        },
        pulse2: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        shine: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        swing: {
          '15%': { transform: 'translateX(5px)' },
          '30%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(3px)' },
          '80%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        wobble: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(3rem)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'collapsible-down': 'collapsible-down 0.15s ease-out',
        'collapsible-up': 'collapsible-up 0.15s ease-out',
        flash: 'flash 1.4s infinite linear',
        jump: 'jump 1s ease-in-out infinite',
        pulse2: 'pulse2 1.3s ease-in-out infinite',
        shine: 'shine 2s linear infinite',
        shimmer: 'shimmer 2s infinite',
        swing: 'swing 1s ease 1',
        wobble: 'wobble 1s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
