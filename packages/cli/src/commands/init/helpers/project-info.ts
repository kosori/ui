import { join, resolve } from 'path';
import type { PackageJson } from 'type-fest';
import fg from 'fast-glob';
import fs from 'fs-extra';
import { loadConfig } from 'tsconfig-paths';

import type { ProjectInfo } from '../types';
import {
  CONFIG_FILE_PATTERNS,
  FRAMEWORKS,
  PROJECT_SHARED_IGNORE,
} from '../config/project-info';

/**
 * Analyzes a project directory and returns information about its framework, configuration, and setup
 * @param projectRoot - The root directory of the project to analyze
 * @returns ProjectInfo object containing framework and configuration details
 */
export const getProjectInfo = async (
  projectRoot: string,
): Promise<ProjectInfo | null> => {
  const [
    frameworkConfigFiles,
    hasSrcDirectory,
    isTypeScriptProject,
    tailwindConfigPath,
    tailwindCssPath,
    tsConfigAliasPrefix,
    packageJsonData,
  ] = await Promise.all([
    fg.glob('**/{next,vite,astro}.config.*|gatsby-config.*|composer.json', {
      cwd: projectRoot,
      deep: 3,
      ignore: PROJECT_SHARED_IGNORE,
    }),
    fs.pathExists(resolve(projectRoot, 'src')),
    detectTypeScriptProject(projectRoot),
    findTailwindConfigFile(projectRoot),
    findTailwindCssFile(projectRoot),
    resolveTsConfigAliasPrefix(projectRoot),
    readPackageJson(projectRoot, false),
  ]);

  const hasAppDirectory = await fs.pathExists(
    resolve(projectRoot, `${hasSrcDirectory ? 'src/' : ''}app`),
  );

  const projectInfo: ProjectInfo = {
    framework: FRAMEWORKS.manual,
    isSrcDir: hasSrcDirectory,
    isRSC: false,
    isTsx: isTypeScriptProject,
    tailwindConfigFile: tailwindConfigPath,
    tailwindCssFile: tailwindCssPath,
    aliasPrefix: tsConfigAliasPrefix,
  };

  // Detect framework based on configuration files
  if (findConfigFile(frameworkConfigFiles, CONFIG_FILE_PATTERNS.next)) {
    projectInfo.framework = hasAppDirectory
      ? FRAMEWORKS['next-app']
      : FRAMEWORKS['next-pages'];
    projectInfo.isRSC = hasAppDirectory;
    return projectInfo;
  }

  if (findConfigFile(frameworkConfigFiles, CONFIG_FILE_PATTERNS.astro)) {
    projectInfo.framework = FRAMEWORKS.astro;
    return projectInfo;
  }

  if (findConfigFile(frameworkConfigFiles, CONFIG_FILE_PATTERNS.gatsby)) {
    projectInfo.framework = FRAMEWORKS.gatsby;
    return projectInfo;
  }

  if (findConfigFile(frameworkConfigFiles, CONFIG_FILE_PATTERNS.laravel)) {
    projectInfo.framework = FRAMEWORKS.laravel;
    return projectInfo;
  }

  // Check for Remix in dependencies
  if (
    Object.keys(packageJsonData.dependencies ?? {}).some((dep) =>
      dep.startsWith('@remix-run'),
    )
  ) {
    projectInfo.framework = FRAMEWORKS.remix;
    return projectInfo;
  }

  // Check for Vite last as it might be used with other frameworks
  if (findConfigFile(frameworkConfigFiles, CONFIG_FILE_PATTERNS.vite)) {
    projectInfo.framework = FRAMEWORKS.vite;
    return projectInfo;
  }

  return projectInfo;
};

/**
 * Helper function to find a config file matching a specific pattern
 */
const findConfigFile = (files: string[], pattern: string): boolean => {
  return files.some((file) => file.startsWith(pattern));
};

/**
 * Detects if a project uses TypeScript by checking for tsconfig files
 * @param projectRoot - The root directory of the project
 * @returns boolean indicating if TypeScript is used
 */
export const detectTypeScriptProject = async (
  projectRoot: string,
): Promise<boolean> => {
  const tsConfigFiles = await fg.glob('tsconfig', {
    cwd: projectRoot,
    deep: 1,
    ignore: PROJECT_SHARED_IGNORE,
  });

  return tsConfigFiles.length > 0;
};

/**
 * Locates the Tailwind configuration file in the project
 * @param projectRoot - The root directory of the project
 * @returns The path to the Tailwind config file or null if not found
 */
export const findTailwindConfigFile = async (
  projectRoot: string,
): Promise<string | null> => {
  const configFiles = await fg.glob('tailwind.config.*', {
    cwd: projectRoot,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  });

  return configFiles[0] ?? null;
};

/**
 * Finds the main CSS file that imports Tailwind
 * @param projectRoot - The root directory of the project
 * @returns The path to the main Tailwind CSS file or null if not found
 */
export const findTailwindCssFile = async (
  projectRoot: string,
): Promise<string | null> => {
  const cssFiles = await fg.glob(['**/*.css', '**/*.scss'], {
    cwd: projectRoot,
    deep: 5,
    ignore: PROJECT_SHARED_IGNORE,
  });

  for (const file of cssFiles) {
    const contents = await fs.readFile(resolve(projectRoot, file), 'utf8');
    if (contents.includes('@tailwind base')) return file;
  }

  return null;
};

/**
 * Resolves the TypeScript path alias prefix from tsconfig
 * @param projectRoot - The root directory of the project
 * @returns The path alias prefix or null if not configured
 */
export const resolveTsConfigAliasPrefix = (
  projectRoot: string,
): string | null => {
  const tsconfig = loadConfig(projectRoot);

  if (tsconfig.resultType === 'failed' || !Object.keys(tsconfig.paths).length) {
    return null;
  }

  const commonPaths = ['./*', './src/*', './app/*', './resources/js/*'];

  for (const [alias, paths] of Object.entries(tsconfig.paths)) {
    if (commonPaths.some((path) => paths.includes(path))) {
      return alias.replace(/\/\*$/, '');
    }
  }

  return Object.keys(tsconfig.paths)[0]?.replace(/\/\*$/, '') ?? null;
};

/**
 * Reads and parses the package.json file
 * @param projectRoot - The root directory of the project
 * @param throwError - Whether to throw an error if the file is not found
 * @returns The parsed package.json content
 */
export const readPackageJson = async (
  projectRoot = '',
  throwError = true,
): Promise<PackageJson> => {
  const packageJsonPath = join(projectRoot, 'package.json');
  return fs.readJson(packageJsonPath, {
    throws: throwError,
  }) as Promise<PackageJson>;
};
