import { resolve } from 'path';
import fs from 'fs-extra';

import type { InitOptions } from '../schema';
import { loadProjectConfig } from '~/utils/config';
import { highlighter } from '~/utils/highlighter';
import { logger } from '~/utils/logger';

/**
 * Configuration file name for the project
 */
const CONFIG_FILENAME = 'kosori.config.json';

/**
 * Performs a series of pre-installation checks on the project
 * Validates the project structure, framework, TailwindCSS configuration, and TypeScript setup
 *
 * @param options - Initialization options including project directory and force flag
 * @returns Promise that resolves to the project configuration
 */
export const validateProject = async (options: InitOptions) => {
  validateProjectDirectory(options);
  validateProjectConfiguration(options);
  return await loadProjectConfig(options.cwd);
};

/**
 * Validates whether the project directory exists and contains a package.json file
 */
const validateProjectDirectory = (options: InitOptions) => {
  const packageJsonExist = fs.existsSync(resolve(options.cwd, 'package.json'));

  if (!fs.existsSync(options.cwd) || !packageJsonExist) {
    logger.error(
      `The directory ${highlighter.info(options.cwd)} does not exist or does not contain a ${highlighter.info('package.json')} file.`,
    );
    process.exit(1);
  }
};

/**
 * Validates if the project configuration file exists
 */
const validateProjectConfiguration = (options: InitOptions) => {
  const configExists = fs.existsSync(resolve(options.cwd, CONFIG_FILENAME));
  if (!configExists) {
    logger.error(
      `The ${highlighter.info(CONFIG_FILENAME)} file doesn't exists at ${highlighter.info(options.cwd)}.\n   To start over, run the ${highlighter.info('init')} command from the root of your project.`,
    );
    process.exit(1);
  }
};
