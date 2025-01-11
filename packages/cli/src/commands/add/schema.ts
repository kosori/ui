import { z } from 'zod';

export type Type = z.infer<typeof Type>;
export const Type = z.literal('components').or(z.literal('hooks')).optional();

export type Items = z.infer<typeof Items>;
export const Items = z.array(z.string());

export type InitOptions = z.infer<typeof InitOptions>;
export const InitOptions = z.object({
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
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
