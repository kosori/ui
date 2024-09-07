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

export const component = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  required: z.array(z.string()).optional(),
  type: z.literal('component:ui'),
});

export const components = z.array(component);
