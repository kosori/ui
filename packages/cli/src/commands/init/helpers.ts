import fg from 'fast-glob';

import { IGNORE } from './config';

export const tailwindExists = async ({ cwd }: { cwd: string }) => {
  const tailwindConfig = await fg.glob('tailwind.config.*', {
    cwd,
    deep: 3,
    ignore: IGNORE,
  });

  if (!tailwindConfig.length)
    throw new Error(
      'Tailwind CSS is not installed. Visit https://tailwindcss.com/docs/installation to get started.',
    );

  return true;
};

export const existsConfig = async ({ cwd }: { cwd: string }) => {
  const config = await fg.glob('kosori.config.json', {
    cwd,
    deep: 0,
    ignore: IGNORE,
  });

  if (config.length) throw new Error('Kõsori config already exists');

  return false;
};
