import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export const jsonSchema = z.array(
  z.object({
    name: z.string(),
    type: z.literal('component:ui'),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    file: z.string().optional(),
    content: z.string().optional(),
  }),
);

const formatContent = (str: string) =>
  str
    .replace(/\\/g, '\\\\') // Escape backslashes
    .replace(/"/g, '\\"') // Escape double quotes
    .replace(/\n/g, '\\n'); // Escape new lines

export const getJson = async (path: string) => {
  try {
    const res = await fetch(`https://kosori.codingcodax.dev/${path}`);

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch JSON data');
  }
};

export const convertFilesToJson = async ({
  dir,
  jsonPath,
  outputFileDir,
}: {
  dir: string;
  jsonPath: string;
  outputFileDir: string;
}) => {
  try {
    const files = fs.readdirSync(dir);

    if (!files.length) {
      throw new Error('No files found in directory');
    }

    const localItems = files.map((file) => {
      if (path.extname(file) === '.tsx') {
        const filePath = path.resolve(dir, file);
        const extname = path.extname(file);
        const name = path.basename(filePath, extname);
        const content = fs.readFileSync(filePath, 'utf-8');

        return { name, content: formatContent(content) };
      }
    });

    const remoteItems = jsonSchema.parse(await getJson(jsonPath));

    const formattedItems = remoteItems.map((item) => ({
      ...item,
      content: localItems.find((localItem) => localItem?.name === item.name)
        ?.content,
    }));

    formattedItems.map((item) => {
      const outputFilePath = `${outputFileDir}/${item.name}.json`;
      if (!item.content) return;

      fs.writeFileSync(outputFilePath, JSON.stringify(item, null, 2), 'utf-8');
    });
  } catch (error) {
    console.error(error);
  }
};
