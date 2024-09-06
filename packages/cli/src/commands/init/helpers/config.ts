import path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { loadConfig } from 'tsconfig-paths';

import type { RawConfig } from '~/commands/init/schema';
import { configSchema, rawConfigSchema } from '~/commands/init/schema';
import { resolveImport } from '~/utils/resolveImport';

const explorer = cosmiconfig('kosori', {
  searchPlaces: ['kosori.config.json'],
});

export const getConfig = async ({ cwd }: { cwd: string }) => {
  const config = await getRawConfig({ cwd });

  if (!config) return null;

  return resolveConfigPaths({ cwd, config });
};

export const getRawConfig = async ({ cwd }: { cwd: string }) => {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) return null;

    return rawConfigSchema.parse(configResult.config);
  } catch {
    throw new Error(
      `Invalid configuration found in: ${cwd}/kosori.config.json`,
    );
  }
};

export const resolveConfigPaths = ({
  cwd,
  config,
}: {
  cwd: string;
  config: RawConfig;
}) => {
  const tsConfig = loadConfig(cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(`Failed to load tsconfig.json. ${tsConfig.message}`.trim());
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: resolveImport(config.aliases.utils, tsConfig),
      components: resolveImport(config.aliases.components, tsConfig),
      ui: resolveImport(config.aliases.ui, tsConfig),
    },
  });
};
