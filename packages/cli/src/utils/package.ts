import { detect } from '@antfu/ni';

export type PackageManager = 'yarn' | 'pnpm' | 'npm' | 'bun';

export const getPackageManager = async (targetDir: string) => {
  const packageManager = await detect({ cwd: targetDir, programmatic: true });

  if (packageManager === 'yarn@berry') return 'yarn';
  if (packageManager === 'pnpm@6') return 'pnpm';
  if (packageManager === 'bun') return 'bun';

  return packageManager ?? 'npm';
};
