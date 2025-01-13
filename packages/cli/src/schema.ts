import { z } from 'zod';

export type RawConfig = z.infer<typeof RawConfig>;
export const RawConfig = z
  .object({
    $schema: z.string().optional(),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
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
  })
  .strict();

export type ResolvedPathsConfig = z.infer<typeof ResolvedPathsConfig>;
export const ResolvedPathsConfig = z.object({
  cwd: z.string(),
  tailwindConfig: z.string(),
  tailwindCss: z.string(),
  utils: z.string(),
  components: z.string(),
  ui: z.string(),
});

export type Config = z.infer<typeof Config>;
export const Config = RawConfig.extend({
  resolvedPaths: ResolvedPathsConfig,
});
