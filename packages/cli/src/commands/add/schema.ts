import { z } from 'zod';

export const typeSchema = z
  .literal('components')
  .or(z.literal('hooks'))
  .optional();

export const itemsSchema = z.array(z.string());

export const initOptionsSchema = z.object({
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
  silent: z.boolean(),
});

export const indexSingle = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  required: z.array(z.string()).optional(),
  type: z.literal('component:ui'),
});

export type Index = z.infer<typeof index>;
export const index = z.array(indexSingle);

export const component = indexSingle.extend({ content: z.string() });

export const components = z.array(component);
