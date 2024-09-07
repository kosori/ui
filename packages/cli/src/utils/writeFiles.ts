import { existsSync, promises as fs } from 'fs';
import path from 'path';

export const writeFile = async ({
  dirPath,
  overwrite,
  file,
}: {
  dirPath: string;
  overwrite: boolean;
  file: [string, string];
}) => {
  const [name, content] = file;
  const filePath = path.resolve(dirPath, name);
  const exists = existsSync(filePath);

  if (exists && !overwrite) {
    throw new Error(`File ${filePath} already exists`);
  }

  await fs.writeFile(filePath, content);
};

export const writeFiles = async ({
  dirPath,
  overwrite,
  files,
}: {
  dirPath: string;
  overwrite: boolean;
  files: Record<string, string>;
}) => {
  for (const [name, content] of Object.entries(files)) {
    await writeFile({ dirPath, overwrite, file: [name, content] });
  }
};
