import { promises as fs } from 'fs';

import type { Config } from '../schema';
import {
  CN_FUNCTION,
  GLOBALS_CSS,
  TAILWIND_IMPORT_PLUGIN,
  TAILWIND_THEME,
} from '../config/templates';

/**
 * Manages the writing and updating of template files for project setup
 * @param resolvedPaths - Object containing resolved file paths from config
 * @returns Promise that resolves when all template operations are complete
 * @throws Error if any template operation fails
 */
export const generateProjectTemplates = async (
  resolvedPaths: Config['resolvedPaths'],
): Promise<void> => {
  await Promise.all([
    updateTailwindConfiguration(resolvedPaths.tailwindConfig),
    updateGlobalStylesheet(resolvedPaths.tailwindCss),
    generateUtilityFunction(resolvedPaths.utils),
  ]);
};

/**
 * Updates the Tailwind configuration file with custom theme and plugins
 * @param configPath - Path to the Tailwind config file
 * @returns Promise resolving to the update result
 */
const updateTailwindConfiguration = async (configPath: string) => {
  const existingConfig = await fs.readFile(configPath, 'utf8');

  const updatedConfig = existingConfig
    .replace(/extend:\s*{[^}]*}/s, `extend: {${TAILWIND_THEME}}`)
    // Add plugin import
    .replace(
      /(import type { Config } from "tailwindcss";\n)/,
      `$1${TAILWIND_IMPORT_PLUGIN}`,
    )
    // Add plugin to configuration
    .replace(/plugins:\s*\[\]/, 'plugins: [animate]');

  await fs.writeFile(configPath, updatedConfig, 'utf8');
};

/**
 * Updates the global CSS file with template styles
 * @param stylesheetPath - Path to the global CSS file
 * @returns Promise resolving to the update result
 */
const updateGlobalStylesheet = async (stylesheetPath: string) => {
  await fs.writeFile(stylesheetPath, GLOBALS_CSS, 'utf8');
};

/**
 * Generates the utility function file for className handling
 * @param utilityPath - Path to the utility function file
 * @returns Promise resolving to the generation result
 */
const generateUtilityFunction = async (utilityPath: string) => {
  await fs.writeFile(utilityPath, CN_FUNCTION, 'utf8');
};
