import { execa } from 'execa';

import type { PackageManager } from './package';

export const installDependencies = async ({
  packageManager,
  dependencies,
  targetDir,
}: {
  packageManager: PackageManager;
  dependencies: string[];
  targetDir: string;
}) => {
  return await execa(
    packageManager,
    [packageManager === 'npm' ? 'install' : 'add', ...dependencies],
    {
      cwd: targetDir,
    },
  );
};
