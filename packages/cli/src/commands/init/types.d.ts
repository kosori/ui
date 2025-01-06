import type { FRAMEWORKS } from './config/project-info';

/**
 * Type representing the supported framework configurations.
 * Used to identify and handle different frameworks with their specific settings.
 * @see [FRAMEWORKS](./config/project-info.ts) constant for the complete configuration details
 */
export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];

/**
 * Information about a project's configuration and setup.
 * Contains details about the framework, directory structure, and various config files.
 */
export type ProjectInfo = {
  /** The framework used in the project (e.g., Next.js, Remix, Vite) */
  framework: Framework;
  /** Whether the project uses a 'src' directory for source files */
  isSrcDir: boolean;
  /** Whether the project uses React Server Components (RSC) */
  isRSC: boolean;
  /** Whether the project uses TypeScript with JSX (TSX) */
  isTsx: boolean;
  /** Path to the Tailwind config file, if it exists */
  tailwindConfigFile: string | null;
  /** Path to the main Tailwind CSS file, if it exists */
  tailwindCssFile: string | null;
  /** TypeScript path alias prefix configured in tsconfig, if any */
  aliasPrefix: string | null;
};
