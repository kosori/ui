import { existsSync, promises as fs } from 'fs';
import path from 'path';

import type { Config } from '../schema';
import { GLOBALS_CSS, LAYOUT, TAILWIND_CONFIG, UTILS } from '~/utils/templates';

export const writeTemplates = async ({
  projectConfig,
}: {
  projectConfig: Config;
}) => {
  for (const [_key, resolvedPath] of Object.entries(
    projectConfig.resolvedPaths,
  )) {
    const dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath;

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  // Overwrite tailwind file
  await fs.writeFile(
    projectConfig.resolvedPaths.tailwindConfig,
    TAILWIND_CONFIG,
    'utf8',
  );

  // Overwrite css file
  await fs.writeFile(
    projectConfig.resolvedPaths.tailwindCss,
    GLOBALS_CSS,
    'utf8',
  );

  // Write cn file
  await fs.writeFile(
    `${projectConfig.resolvedPaths.utils}/cn.ts`,
    UTILS,
    'utf8',
  );

  // Overwrite layout file
  await fs.writeFile(projectConfig.resolvedPaths.layout, LAYOUT, 'utf8');
};
