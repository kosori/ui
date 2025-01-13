import { log } from '@clack/prompts';

const { info, success, warn, error, step } = log;

/**
 * Simple console log using the `@clack/prompts`
 *
 * @example
 * ```ts
 * logger.info('Hello world!');
 * ```
 */
export const logger = {
  info: (args: string) => info(args),
  success: (args: string) => success(args),
  warn: (args: string) => warn(args),
  error: (args: string) => error(args),
  step: (args: string) => step(args),
  log: (args: string) => console.log(args),
  break: () => console.log(''),
};
