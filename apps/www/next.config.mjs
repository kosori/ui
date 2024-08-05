import { fileURLToPath } from 'url';
import { rehypeCode, remarkImage } from 'fumadocs-core/mdx-plugins';
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen';
import createMDX from 'fumadocs-mdx/config';
import createJiti from 'jiti';

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))('./src/env');

const withMDX = createMDX({
  mdxOptions: {
    lastModifiedTime: 'git',
    remarkPlugins: [
      [remarkDocGen, { generators: [fileGenerator()] }],
      remarkInstall,
      remarkImage,
    ],
    rehypePlugins: [rehypeCode],
  },
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@kosori/ui'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /** Images */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withMDX(config);
