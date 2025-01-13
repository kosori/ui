/**
 * Mapping of framework identifiers to their configuration file prefixes.
 * Used to detect framework types based on their configuration files.
 * @const
 */
export const CONFIG_FILE_PATTERNS = {
  next: 'next.config.',
  astro: 'astro.config.',
  gatsby: 'gatsby-config.',
  laravel: 'laravel.config.',
  vite: 'vite.config.',
} as const;

/**
 * List of directories and patterns to ignore when scanning project files.
 * These are common build outputs and dependency directories that should be excluded.
 * @const
 */
export const PROJECT_SHARED_IGNORE = [
  '**/node_modules/**',
  '.next',
  'public',
  'dist',
  'build',
];

/**
 * Comprehensive configuration for supported frameworks.
 * Each framework entry contains:
 * @property {string} name - The identifier for the framework
 * @property {string} label - Display name for the framework
 * @property {Object} links - Framework-specific documentation links
 * @property {string} links.installation - URL to Kosori installation guide
 * @property {string} links.tailwind - URL to Tailwind CSS setup guide
 * @const
 */
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
      tailwind: 'https://tailwindcss.com/docs/guides/nextjs',
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
