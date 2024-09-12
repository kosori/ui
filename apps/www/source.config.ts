import { rehypeCode, remarkImage } from 'fumadocs-core/mdx-plugins';
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs();

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [remarkDocGen, { generators: [fileGenerator()] }],
      [remarkInstall, { persist: { id: 'package-install' } }],
      [remarkImage],
    ],
    rehypePlugins: [rehypeCode],
  },
});
