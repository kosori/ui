import { loader } from 'fumadocs-core/source';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';

import { map } from '../../.map';

export const docs = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  source: createMDXSource(map, {
    schema: {
      frontmatter: defaultSchemas.frontmatter.extend({
        links: z
          .object({ doc: z.string().optional(), api: z.string().optional() })
          .optional(),
        dependencies: z.array(z.string()).optional(),
      }),
    },
  }),
});
