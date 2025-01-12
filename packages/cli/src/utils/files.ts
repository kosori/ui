import { existsSync, promises as fs } from 'fs';
import path from 'path';

type FileContent = {
  name: string;
  content: string;
};

type WriteFile = {
  targetDir: string;
  overwrite: boolean;
  file: FileContent;
};

/**
 * Writes a single file to the filesystem
 * @returns The filename if it already exists and overwrite is false, undefined otherwise
 */
export const writeFile = async ({
  targetDir,
  overwrite,
  file,
}: WriteFile): Promise<string | undefined> => {
  const { name, content } = file;
  const filePath = path.resolve(targetDir, name);

  if (existsSync(filePath) && !overwrite) return name;

  await fs.writeFile(filePath, content, 'utf8');
  return undefined;
};

type WriteFiles = {
  targetDir: string;
  overwrite: boolean;
  files: FileContent[];
};

/**
 * Writes multiple files to the filesystem
 * @returns Array of filenames that already existed and weren't overwritten
 */
export const writeFiles = async ({
  targetDir,
  overwrite,
  files,
}: WriteFiles): Promise<string[]> => {
  const results = await Promise.all(
    files.map((file) => writeFile({ targetDir, overwrite, file })),
  );

  return results.filter((result): result is string => result !== undefined);
};
