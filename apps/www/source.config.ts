import { rehypeCode, remarkImage } from 'fumadocs-core/mdx-plugins';
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({ doc: z.string().optional(), api: z.string().optional() })
        .optional(),
      dependencies: z.array(z.string()).optional(),
    }),
  },
});

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
