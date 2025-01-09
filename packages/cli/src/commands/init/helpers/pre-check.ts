import { resolve } from 'path';
import fs from 'fs-extra';

import type { InitOptions } from '../schema';
import type { ProjectInfo } from '../types';
import { highlighter } from '~/utils/highlighter';
import { logger } from '~/utils/logger';
import { ERRORS } from '../config/errors';
import { getProjectInfo } from './project-info';

/**
 * Configuration file name for the project
 */
const CONFIG_FILENAME = 'kosori.config.json';

/**
 * Performs a series of pre-installation checks on the project
 * Validates the project structure, framework, TailwindCSS configuration, and TypeScript setup
 *
 * @param options - Initialization options including project directory and force flag
 * @returns Object containing validation errors and project information
 */
export const validateProject = async (options: InitOptions) => {
  const errors: Record<string, boolean> = {};
  const projectRoot = resolve(process.cwd(), options.cwd);

  validateProjectDirectory(projectRoot, options);
  validateProjectInitialization(options);

  const projectInfo = await getProjectInfo(projectRoot);

  validateFramework(projectRoot, projectInfo);
  validateTailwindSetup(projectInfo, errors);
  validateTypeScriptSetup(projectInfo, errors);

  if (Object.keys(errors).length > 0) {
    handleValidationErrors(errors, projectInfo, options.cwd);
    process.exit(1);
  }

  return { errors, projectInfo };
};

/**
 * Validates whether the project directory exists and contains a package.json file
 */
const validateProjectDirectory = (
  projectRoot: string,
  options: InitOptions,
) => {
  const packageJsonExist = fs.existsSync(resolve(options.cwd, 'package.json'));

  if (!fs.existsSync(projectRoot) || !packageJsonExist) {
    logger.error(
      `The directory ${highlighter.info(projectRoot)} does not exist or does not contain a ${highlighter.info('package.json')} file.`,
    );
    process.exit(1);
  }
};

/**
 * Validates whether the project has already been initialized
 * Exits if the project is already initialized and force flag is not set
 */
const validateProjectInitialization = (options: InitOptions) => {
  const configExists = fs.existsSync(resolve(options.cwd, CONFIG_FILENAME));
  if (configExists && !options.force) {
    logger.error(
      `A ${highlighter.info(CONFIG_FILENAME)} file already exists at ${highlighter.info(options.cwd)}.\n   To start over, remove the ${highlighter.info(CONFIG_FILENAME)} file and run ${highlighter.info('init')} again`,
    );
    process.exit(1);
  }
};

/**
 * Detects and validates the project framework
 * Exits if no supported framework is detected
 */
const validateFramework = (projectRoot: string, projectInfo: ProjectInfo) => {
  if (projectInfo.framework.name === 'manual') {
    logger.error(
      `We could not detect a supported framework at ${highlighter.info(projectRoot)}.\n   Visit ${highlighter.info(projectInfo.framework.links.installation)} to manually configure your project.\n   Once configured, you can use the cli to add components.`,
    );
    process.exit(1);
  }
};

/**
 * Validates the TailwindCSS configuration
 */
const validateTailwindSetup = (
  projectInfo: ProjectInfo,
  errors: Record<string, boolean>,
) => {
  if (!projectInfo.tailwindConfigFile || !projectInfo.tailwindCssFile) {
    errors[ERRORS.TAILWIND_NOT_CONFIGURED] = true;
    logger.error('TailwindCSS is not configured.');
  }
};

/**
 * Validates the TypeScript configuration
 */
const validateTypeScriptSetup = (
  projectInfo: ProjectInfo,
  errors: Record<string, boolean>,
) => {
  if (!projectInfo.aliasPrefix) {
    errors[ERRORS.IMPORT_ALIAS_MISSING] = true;
    logger.error('Type alias was not founded.');
  }
};

/**
 * Handles and displays validation errors
 */
const handleValidationErrors = (
  errors: Record<string, boolean>,
  projectInfo: ProjectInfo,
  projectRoot: string,
) => {
  if (errors[ERRORS.TAILWIND_NOT_CONFIGURED]) {
    logger.error(
      `No Tailwind CSS configuration found at ${highlighter.info(projectRoot)}.\n   It is likely you do not have Tailwind CSS installed or have an invalid configuration.\n   Install Tailwind CSS then try again.\n   Visit ${highlighter.info(projectInfo.framework.links.tailwind)} to get started.`,
    );
  }

  if (errors[ERRORS.IMPORT_ALIAS_MISSING]) {
    logger.error(
      'No import alias found in your tsconfig.json file.\n   Visit ${highlighter.info(projectInfo.framework.links.installation)} to learn how to set an import alias.',
    );
  }
};
