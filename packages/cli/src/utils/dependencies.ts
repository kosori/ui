import { execa } from 'execa';

import { detectPackageManager } from '~/utils/package';

/**
 * Installs project dependencies using the detected package manager
 * @param dependencies - Array of dependency packages to install
 * @param projectRoot - Root directory where dependencies should be installed
 * @returns Promise resolving to installation result
 */
export const installDependencies = async (
  dependencies: string[],
  projectRoot: string,
) => {
  const uniqueDependencies = [...new Set(dependencies)];

  if (uniqueDependencies.length === 0) return;

  const packageManager = await detectPackageManager(projectRoot);

  const installCommand = packageManager === 'npm' ? 'install' : 'add';

  await execa(packageManager, [installCommand, ...uniqueDependencies], {
    cwd: projectRoot,
  });
};
