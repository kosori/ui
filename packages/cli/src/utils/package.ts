import { detect } from '@antfu/ni';

export type PackageManager = 'yarn' | 'pnpm' | 'npm' | 'bun';

export const getPackageManager = async ({
  targetDir,
}: {
  targetDir: string;
}) => {
  const detectedPackageManager = await detect({
    cwd: targetDir,
    programmatic: true,
  });

  if (!detectedPackageManager) return 'npm';

  const packageManagerMap: Record<string, PackageManager> = {
    'yarn@berry': 'yarn',
    'yarn@1': 'yarn',
    pnpm: 'pnpm',
    'pnpm@6': 'pnpm',
    npm: 'npm',
    bun: 'bun',
  };

  return packageManagerMap[detectedPackageManager] ?? 'npm';
};
