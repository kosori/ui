import path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { loadConfig } from 'tsconfig-paths';

import type { ProjectInfo } from '~/types/project-info';
import { Config, RawConfig } from '~/commands/init/schema';
import { highlighter } from '~/utils/highlighter';
import { getProjectInfo } from '~/utils/project-info';
import { resolveImport } from '~/utils/resolve-import';

/**
 * Configuration schema URL for validation
 */
const SCHEMA_URL = 'https://kosori.codingcodax.dev/schema.json';

/**
 * Configuration explorer instance for finding kosori config files
 */
const configExplorer = cosmiconfig('kosori', {
  searchPlaces: ['kosori.config.json'],
});

/**
 * Loads and validates the project configuration
 * @param projectRoot - The root directory of the project
 * @returns Parsed and resolved configuration or null if not found
 */
export const loadProjectConfig = async (projectRoot: string) => {
  const rawConfig = await loadRawConfig(projectRoot);

  if (!rawConfig) return null;

  return resolveConfigurationPaths(projectRoot, rawConfig);
};

/**
 * Loads the raw configuration file without path resolution
 * @param projectRoot - The root directory of the project
 * @returns Raw configuration object or null if not found
 * @throws Error if configuration is invalid
 */
export const loadRawConfig = async (projectRoot: string) => {
  try {
    const configResult = await configExplorer.search(projectRoot);

    if (!configResult) return null;

    return RawConfig.parse(configResult.config);
  } catch {
    const configPath = path.join(projectRoot, 'kosori.config.json');
    throw new Error(
      `Invalid configuration found in: ${highlighter.info(configPath)}`,
    );
  }
};

/**
 * Resolves relative paths in the configuration to absolute paths
 * @param projectRoot - The root directory of the project
 * @param rawConfig - The raw configuration object
 * @returns Configuration with resolved absolute paths
 * @throws Error if tsconfig.json cannot be loaded
 */
export const resolveConfigurationPaths = (
  projectRoot: string,
  rawConfig: RawConfig,
) => {
  const tsConfig = loadConfig(projectRoot);

  if (tsConfig.resultType === 'failed') {
    throw new Error(`Failed to load tsconfig.json. ${tsConfig.message}`.trim());
  }

  return Config.parse({
    ...rawConfig,
    resolvedPaths: {
      cwd: projectRoot,
      tailwindConfig: path.resolve(projectRoot, rawConfig.tailwind.config),
      tailwindCss: path.resolve(projectRoot, rawConfig.tailwind.css),
      utils: resolveImport(rawConfig.aliases.utils, tsConfig),
      components: resolveImport(rawConfig.aliases.components, tsConfig),
      ui: resolveImport(rawConfig.aliases.ui, tsConfig),
    },
  });
};

/**
 * Creates or loads project configuration based on provided or detected project information
 * @param projectRoot - The root directory of the project
 * @param existingProjectInfo - Optional existing project information to use instead of detecting
 * @returns Resolved project configuration or null if required information is missing
 */
export const createOrLoadProjectConfig = async (
  projectRoot: string,
  existingProjectInfo: ProjectInfo | null = null,
) => {
  const [existingConfig, projectInfo] = await Promise.all([
    loadProjectConfig(projectRoot),
    existingProjectInfo
      ? Promise.resolve(existingProjectInfo)
      : getProjectInfo(projectRoot),
  ]);

  if (existingConfig) return existingConfig;

  const defaultConfig: RawConfig = {
    $schema: SCHEMA_URL,
    rsc: projectInfo.isRSC,
    tsx: projectInfo.isTsx,
    tailwind: {
      config: projectInfo.tailwindConfigFile ?? '',
      css: projectInfo.tailwindCssFile ?? '',
    },
    aliases: {
      components: `${projectInfo.aliasPrefix}/components`,
      utils: `${projectInfo.aliasPrefix}/utils`,
      ui: `${projectInfo.aliasPrefix}/components/ui`,
      hooks: `${projectInfo.aliasPrefix}/hooks`,
    },
  };

  return resolveConfigurationPaths(projectRoot, defaultConfig);
};
