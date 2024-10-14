import { existsSync, promises as fs } from 'fs';
import path from 'path';

import { buildPrettifier } from './buildPrettifier';

const prettify = buildPrettifier();

export const writeFile = async ({
  dirPath,
  overwrite,
  file,
}: {
  dirPath: string;
  overwrite: boolean;
  file: { name: string; content: string };
}) => {
  const { name, content } = file;
  const filePath = path.resolve(dirPath, name);
  const exists = existsSync(filePath);

  if (exists && !overwrite) {
    throw new Error(`File ${filePath} already exists`);
  }

  await fs.writeFile(filePath, prettify(content), 'utf8');
};

export const writeFiles = async ({
  dirPath,
  overwrite,
  files,
}: {
  dirPath: string;
  overwrite: boolean;
  files: { name: string; content: string }[];
}) => {
  for (const { name, content } of files) {
    await writeFile({ dirPath, overwrite, file: { name, content } });
  }
};
