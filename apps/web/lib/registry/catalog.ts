import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { StyleName } from '@/registry/preset';

/** A catalog item as documentation reads it: its name and install type. */
export type CatalogItem = {
  name: string;
  type: string;
};

const REGISTRY_DIR = join(process.cwd(), 'registry');

/** Read the catalog a Style's Registry serves. */
export const readCatalog = async (style: StyleName): Promise<CatalogItem[]> => {
  const catalog: { items: CatalogItem[] } = JSON.parse(
    await readFile(join(REGISTRY_DIR, style, 'registry.json'), 'utf8')
  );

  return catalog.items;
};
