import { existsSync } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import fs, { pathExists } from 'fs-extra';
import { loadConfig } from 'tsconfig-paths';

import type { Config, RawConfig } from '../schema';
import { IGNORE } from '../config';
import { getConfig, resolveConfigPaths } from './config';

const _PROJECT_TYPES = [
  'next-app',
  'next-app-src',
  'next-pages',
  'next-pages-src',
] as const;

type ProjectType = (typeof _PROJECT_TYPES)[number];

export const getProjectConfig = async ({
  cwd,
}: {
  cwd: string;
}): Promise<Config | null> => {
  const existingConfig = await getConfig({ cwd });

  if (existingConfig) return existingConfig;

  const projectType = await getProjectType({ cwd });
  const tailwindCssFile = await getTailwindCssFile({ cwd });
  const tsConfigAliasPrefix = getTsConfigAliasPrefix({ cwd });

  if (!projectType || !tailwindCssFile || !tsConfigAliasPrefix) return null;

  const config: RawConfig = {
    $schema: 'https://kosori.codingcodax.dev/schema.json',
    tailwind: {
      config: 'tailwind.config.ts',
      css: tailwindCssFile,
    },
    aliases: {
      components: `${tsConfigAliasPrefix}/components`,
      utils: `${tsConfigAliasPrefix}/utils`,
      ui: `${tsConfigAliasPrefix}/components/ui`,
      hooks: `${tsConfigAliasPrefix}/hooks`,
    },
  };

  return await resolveConfigPaths({ cwd, config });
};

export const getProjectInfo = async () => {
  const info = {
    tsconfig: null,
    srcDir: false,
    appDir: false,
    srcComponentsUiDir: false,
    componentsUiDir: false,
  };

  try {
    const tsconfig = await getTsConfig();

    return {
      tsconfig,
      srcDir: existsSync(path.resolve('./src')),
      appDir:
        existsSync(path.resolve('./app')) ||
        existsSync(path.resolve('./src/app')),
      srcComponentsUiDir: existsSync(path.resolve('./src/components/ui')),
      componentsUiDir: existsSync(path.resolve('./components/ui')),
    };
  } catch {
    return info;
  }
};

export const getTsConfig = async () => {
  try {
    const tsConfigPath = path.join('tsconfig.json');
    const tsconfig = (await fs.readJson(tsConfigPath)) as object | null;

    if (!tsconfig) throw new Error('tsconfig.json is missing');

    return tsconfig;
  } catch {
    return null;
  }
};

export const getProjectType = async ({
  cwd,
}: {
  cwd: string;
}): Promise<ProjectType | null> => {
  const files = await fg.glob('**/*', { cwd, deep: 3, ignore: IGNORE });

  const isNextProject = files.find((file) => file.startsWith('next.config.'));

  if (!isNextProject) return null;

  const isUsingSrcDir = await pathExists(path.resolve(cwd, 'src'));
  const isUsingAppDir = await pathExists(
    path.resolve(cwd, `${isUsingSrcDir ? 'src/' : ''}app`),
  );

  if (isUsingAppDir) return isUsingSrcDir ? 'next-app-src' : 'next-app';

  return isUsingSrcDir ? 'next-pages-src' : 'next-pages';
};

export const getTailwindCssFile = async ({ cwd }: { cwd: string }) => {
  const files = await fg.glob('**/*.css', { cwd, deep: 3, ignore: IGNORE });

  if (!files.length) return null;

  for (const file of files) {
    const contents = await fs.readFile(path.resolve(cwd, file), 'utf8');

    if (contents.includes('@tailwind base')) return file;
  }

  return null;
};

export const getTsConfigAliasPrefix = ({ cwd }: { cwd: string }) => {
  const tsconfig = loadConfig(cwd);

  if (tsconfig.resultType === 'failed') return null;

  for (const [alias, paths] of Object.entries(tsconfig.paths)) {
    if (paths.includes('./*') || paths.includes('./src/*')) return alias.at(0);
  }

  return null;
};
