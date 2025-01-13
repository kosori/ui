import { detect } from '@antfu/ni';

/**
 * Detects the package manager used in a project
 * Falls back to npm if no specific package manager is detected
 *
 * @param projectRoot - The root directory of the project
 * @returns Promise resolving to the detected package manager
 */
export const detectPackageManager = async (projectRoot: string) => {
  const detectedManager = await detect({
    cwd: projectRoot,
    programmatic: true,
  });

  if (detectedManager === 'yarn@berry') return 'yarn';
  if (detectedManager === 'pnpm@6') return 'pnpm';
  if (detectedManager === 'bun') return 'bun';

  return detectedManager ?? 'npm';
};
