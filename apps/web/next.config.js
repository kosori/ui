import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.localhost', 'ui.ccdx.dev'],
  redirects: () => [
    {
      destination: '/docs/zen',
      permanent: true,
      source: '/docs/ui',
    },
    {
      destination: '/docs/zen/:path*',
      permanent: true,
      source: '/docs/ui/:path*',
    },
  ],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
