import colors from 'picocolors';

/**
 * Simple highlighter for terminal output
 * Modify the text color, background color and font style
 *
 * @example
 * ```ts
 * highlighter.info('Hello world!');
 * ```
 */
export const highlighter = {
  info: colors.cyan,
  success: colors.green,
  warn: colors.yellow,
  error: colors.red,

  bgInfo: colors.bgCyan,

  bold: colors.bold,
};
