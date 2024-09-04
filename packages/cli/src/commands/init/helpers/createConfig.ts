import { existsSync, promises as fs } from 'fs';
import path from 'path';

import { GLOBALS_CSS, TAILWIND_CONFIG, UTILS } from '~/utils/templates';
import { Config } from '../schema';

export const createConfig = async ({ config }: { config: Config }) => {
  for (const [_key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath;

    if (!existsSync(dirname)) {
      // await fs.mkdir(dirname, { recursive: true });
      console.log('creted:', dirname);
    }

    console.log('🚀 ~ dirname:', dirname);
  }

  // Wrte tailwind file
  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    TAILWIND_CONFIG,
    'utf8',
  );

  // Write css file
  await fs.writeFile(config.resolvedPaths.tailwindCss, GLOBALS_CSS, 'utf8');

  // Write cn file
  await fs.writeFile(`${config.resolvedPaths.utils}/cn.ts`, UTILS, 'utf8');
};
