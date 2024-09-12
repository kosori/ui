import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { z } from 'zod';

import { docs, meta } from '../../.source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  schema: z.object({
    links: z
      .object({ doc: z.string().optional(), api: z.string().optional() })
      .optional(),
    dependencies: z.array(z.string()).optional(),
  }),
});
