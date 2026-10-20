import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { RegistryItem } from 'shadcn/schema';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/** Read the catalog a Style's Registry serves. */
export const readCatalog = async (style: string): Promise<RegistryItem[]> => {
  const catalog: { items: RegistryItem[] } = JSON.parse(
    await readFile(join(REGISTRY_DIR, style, 'registry.json'), 'utf8')
  );

  return catalog.items;
};
