export const CONFIG_FILE_PATTERNS = {
  next: 'next.config.',
  astro: 'astro.config.',
  gatsby: 'gatsby-config.',
  laravel: 'laravel.config.',
  vite: 'vite.config.',
} as const;

export const PROJECT_SAHRED_IGNORE = [
  '**/node_modules/**',
  '.next',
  'public',
  'dist',
  'build',
];

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];

export const FRAMEWORKS = {
  'next-app': {
    name: 'next-app',
    label: 'Next.js',
    links: {
      installation: 'https://kosori.codingcodax.dev/docs/ui/installation/next',
      tailwind: 'https://tailwindcss.com/docs/guides/nextjs',
    },
  },
  'next-pages': {
    name: 'next-pages',
    label: 'Next.js',
    links: {
      installation: 'https://kosori.codingcodax.dev/docs/ui/installation/next',
      taiwind: 'https://tailwindcss.com/docs/guides/nextjs',
    },
  },
  remix: {
    name: 'remix',
    label: 'Remix',
    links: {
      installation: 'https://kosori.codingcodax.dev/docs/ui/installation/remix',
      tailwind: 'https://tailwindcss.com/docs/guides/remix',
    },
  },
  vite: {
    name: 'vite',
    label: 'Vite',
    links: {
      installation: 'https://kosori.codingcodax.dev/docs/ui/installation/vite',
      tailwind: 'https://tailwindcss.com/docs/guides/vite',
    },
  },
  astro: {
    name: 'astro',
    label: 'Astro',
    links: {
      installation: 'https://kosori.codingcodax.dev/docs/ui/installation/astro',
      tailwind: 'https://tailwindcss.com/docs/guides/astro',
    },
  },
  laravel: {
    name: 'laravel',
    label: 'Laravel',
    links: {
      installation:
        'https://kosori.codingcodax.dev/docs/ui/installation/laravel',
      tailwind: 'https://tailwindcss.com/docs/guides/laravel',
    },
  },
  gatsby: {
    name: 'gatsby',
    label: 'Gatsby',
    links: {
      installation:
        'https://kosori.codingcodax.dev/docs/ui/installation/gatsby',
      tailwind: 'https://tailwindcss.com/docs/guides/gatsby',
    },
  },
  manual: {
    name: 'manual',
    label: 'Manual',
    links: {
      installation:
        'https://kosori.codingcodax.dev/docs/ui/installation/manual',
      tailwind: 'https://tailwindcss.com/docs/installation',
    },
  },
} as const;
