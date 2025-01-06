import { resolve } from 'path';
import { spinner } from '@clack/prompts';
import fs from 'fs-extra';

import type { InitOptions } from '../schema';
import type { ProjectInfo } from '../types';
import { highlighter } from '~/utils/highlighter';
import { logger } from '~/utils/logger';
import { ERRORS } from '../config';
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

  logger.info(`${highlighter.bold('Checking requirements')}`);

  // Check if project directory exists and contains required files
  validateProjectDirectory(projectRoot, options);

  // Check if project is already initialized
  validateProjectInitialization(options);

  const projectInfo = await getProjectInfo(projectRoot);
  if (!projectInfo) {
    return { errors, projectInfo: null };
  }

  // Detect and validate framework
  validateFramework(projectRoot, projectInfo);

  // Validate TailwindCSS configuration
  validateTailwindSetup(projectInfo, errors);

  // Validate TypeScript configuration
  validateTypeScriptSetup(projectInfo, errors);

  // Handle any validation errors
  if (Object.keys(errors).length > 0) {
    handleValidationErrors(errors, projectInfo, options.cwd);
    process.exit(1);
  }

  logger.info(`${highlighter.bold('Requirements validated')}`);

  return { errors, projectInfo };
};

/**
 * Validates whether the project directory exists and contains a package.json file
 */
const validateProjectDirectory = (
  projectRoot: string,
  options: InitOptions,
) => {
  const directorySpinner = spinner();
  directorySpinner.start('Verifying directory');

  const packageJsonExist = fs.existsSync(resolve(options.cwd, 'package.json'));

  if (!fs.existsSync(projectRoot) || !packageJsonExist) {
    directorySpinner.stop(
      `The directory ${highlighter.info(projectRoot)} does not exist or does not contain a ${highlighter.info('package.json')} file.`,
      1,
    );
    process.exit(1);
  }

  directorySpinner.stop('The directory seems to be valid.');
};

/**
 * Validates whether the project has already been initialized
 * Exits if the project is already initialized and force flag is not set
 */
const validateProjectInitialization = (options: InitOptions) => {
  const initSpinner = spinner();
  initSpinner.start('Verifying project');

  const configExists = fs.existsSync(resolve(options.cwd, CONFIG_FILENAME));
  if (configExists && !options.force) {
    initSpinner.stop(
      `A ${highlighter.info(CONFIG_FILENAME)} file already exists at ${highlighter.info(options.cwd)}.\n   To start over, remove the ${highlighter.info(CONFIG_FILENAME)} file and run ${highlighter.info('init')} again`,
      1,
    );
    process.exit(1);
  }

  initSpinner.stop('The project is not already configured.');
};

/**
 * Detects and validates the project framework
 * Exits if no supported framework is detected
 */
const validateFramework = (projectRoot: string, projectInfo: ProjectInfo) => {
  const frameworkSpinner = spinner();
  frameworkSpinner.start('Verifying framework');

  if (projectInfo.framework.name === 'manual') {
    frameworkSpinner.stop(
      `We could not detect a supported framework at ${highlighter.info(projectRoot)}.\n   Visit ${highlighter.info(projectInfo.framework.links.installation)} to manually configure your project.\n   Once configured, you can use the cli to add components.`,
      1,
    );
    process.exit(1);
  }

  frameworkSpinner.stop(
    `The project uses the ${highlighter.info(projectInfo.framework.label)} framework.`,
  );
};

/**
 * Validates the TailwindCSS configuration
 */
const validateTailwindSetup = (
  projectInfo: ProjectInfo,
  errors: Record<string, boolean>,
) => {
  const tailwindSpinner = spinner();
  tailwindSpinner.start('Verifying TailwindCSS');

  if (!projectInfo.tailwindConfigFile || !projectInfo.tailwindCssFile) {
    errors[ERRORS.TAILWIND_NOT_CONFIGURED] = true;
    tailwindSpinner.stop('TailwindCSS is not configured.', 1);
  } else {
    tailwindSpinner.stop('TailwindCSS is configured.');
  }
};

/**
 * Validates the TypeScript configuration
 */
const validateTypeScriptSetup = (
  projectInfo: ProjectInfo,
  errors: Record<string, boolean>,
) => {
  const tsconfigSpinner = spinner();
  tsconfigSpinner.start('Verifying TypeScript');

  if (!projectInfo.aliasPrefix) {
    errors[ERRORS.IMPORT_ALIAS_MISSING] = true;
    tsconfigSpinner.stop('Type alias was not founded.');
  } else {
    tsconfigSpinner.stop(
      `The project uses the ${highlighter.info(projectInfo.aliasPrefix)} alias.`,
    );
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
