import { z } from 'zod';

export const typeSchema = z.literal('ui').or(z.literal('template'));

export type InitOptions = z.infer<typeof InitOptions>;
export const InitOptions = z.object({
  yes: z.boolean(),
  force: z.boolean(),
  cwd: z.string(),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;
export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
  }),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    hooks: z.string(),
  }),
  project: z.enum(['next-app', 'next-app-src', 'next-pages', 'next-pages-src']),
});

export type Config = z.infer<typeof configSchema>;
export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    ui: z.string(),
    layout: z.string(),
  }),
});
