import { join, resolve } from 'path';
import type { PackageJson } from 'type-fest';
import { glob } from 'fast-glob';
import { pathExists, readFile, readJson } from 'fs-extra';
import { loadConfig } from 'tsconfig-paths';

import type { ProjectInfo } from '../types';
import { FRAMEWORKS } from '../config/frameworks';
import { PROJECT_SAHRED_IGNORE } from '../config/ignore';

export const getProjectInfo = async (cwd: string) => {
  const [
    configFiles,
    isSrcDir,
    isTsx,
    tailwindConfigFile,
    tailwindCssFile,
    aliasPrefix,
    packageJson,
  ] = await Promise.all([
    glob('**/{next,vite,astro}.config.*|gatsby-config.*|composer.json', {
      cwd,
      deep: 3,
      ignore: PROJECT_SAHRED_IGNORE,
    }),
    pathExists(resolve(cwd, 'src')),
    isTypescriptProject(cwd),
    getTailwindConfigFile(cwd),
    getTailwindCssFile(cwd),
    getTsConfigAliasPrefix(cwd),
    getPackageInfo(cwd, false),
  ]);

  const isUsingAppDir = await pathExists(
    resolve(cwd, `${isSrcDir ? 'src/' : ''}app`),
  );

  const type: ProjectInfo = {
    framework: FRAMEWORKS.manual,
    isSrcDir,
    isRSC: false,
    isTsx,
    tailwindConfigFile,
    tailwindCssFile,
    aliasPrefix,
  };

  // Next.js
  if (configFiles.find((file) => file.startsWith('next.config.'))?.length) {
    type.framework = isUsingAppDir
      ? FRAMEWORKS['next-app']
      : FRAMEWORKS['next-pages'];
    type.isRSC = isUsingAppDir;
    return type;
  }

  // Astro
  if (configFiles.find((file) => file.startsWith('astro.config.'))?.length) {
    type.framework = FRAMEWORKS.astro;
    return type;
  }

  // Gatsby
  if (configFiles.find((file) => file.startsWith('gatsby-config.'))?.length) {
    type.framework = FRAMEWORKS.gatsby;
    return type;
  }

  // Laravel
  if (configFiles.find((file) => file.startsWith('laravel.config.'))?.length) {
    type.framework = FRAMEWORKS.laravel;
    return type;
  }

  // Remix
  if (
    Object.keys(packageJson.dependencies ?? {}).find((dep) =>
      dep.startsWith('@remix-run'),
    )
  ) {
    type.framework = FRAMEWORKS.remix;
    return type;
  }

  // Vite
  // Some Remix templates also have a vite.config.* file.
  // We'll asume that it got caught by the Remix check above.
  if (configFiles.find((file) => file.startsWith('vite.config.'))?.length) {
    type.framework = FRAMEWORKS.vite;
    return type;
  }
};

export const isTypescriptProject = async (cwd: string) => {
  const files = await glob('tsconfig', {
    cwd,
    deep: 1,
    ignore: PROJECT_SAHRED_IGNORE,
  });

  return files.length > 0;
};

export const getTailwindConfigFile = async (cwd: string) => {
  const files = await glob('tailwind.config.*', {
    cwd,
    deep: 3,
    ignore: PROJECT_SAHRED_IGNORE,
  });

  if (!files.length) return null;
  if (!files[0]) return null;

  return files[0];
};

export const getTailwindCssFile = async (cwd: string) => {
  const files = await glob(['**/*.css', '**/*.scss'], {
    deep: 5,
    ignore: PROJECT_SAHRED_IGNORE,
  });

  if (!files.length) return null;

  for (const file of files) {
    const contents = await readFile(resolve(cwd, file), 'utf8');

    if (contents.includes('@tailwind base')) return file;
  }

  return null;
};

export const getTsConfigAliasPrefix = (cwd: string) => {
  const tsconfig = loadConfig(cwd);

  if (tsconfig.resultType === 'failed' || Object.entries(tsconfig.paths).length)
    return null;

  for (const [alias, paths] of Object.entries(tsconfig.paths)) {
    if (
      paths.includes('./*') ||
      paths.includes('./src/*') ||
      paths.includes('./app/*') ||
      paths.includes('./resources/js/*') // Laravel
    )
      return alias.replace(/\/\*$/, '');
  }

  return Object.keys(tsconfig.paths)[0]?.replace(/\/\*$/, '') ?? null;
};

export const getPackageInfo = async (cwd = '', shouldTrow = true) => {
  const packageJsonPath = join(cwd, 'package.json');

  return (await readJson(packageJsonPath, {
    throws: shouldTrow,
  })) as PackageJson;
};
