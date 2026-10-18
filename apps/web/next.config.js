import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
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
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
