import { z } from 'zod';

export const typeSchema = z.literal('ui').or(z.literal('template'));

export type InitOptions = z.infer<typeof InitOptions>;
export const InitOptions = z.object({
  yes: z.boolean(),
  force: z.boolean(),
  cwd: z.string(),
});
