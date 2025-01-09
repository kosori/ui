import type { ConfigLoaderSuccessResult } from 'tsconfig-paths';
import { createMatchPath } from 'tsconfig-paths';

/**
 * Resolves an import statement to an absolute path
 *
 * @param importPath - The import statement
 * @param config - The tsconfig-paths configuration
 * @returns String representing the absolute path of the import statement
 */
export const resolveImport = (
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, 'absoluteBaseUrl' | 'paths'>,
) => {
  return createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    ['.ts', '.tsx'],
  );
};
