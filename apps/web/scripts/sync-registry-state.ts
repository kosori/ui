import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { RegistryItem } from 'shadcn/schema';
import { stateCssVarsForSource } from '../lib/registry/state-tokens';
import { STYLES } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');
const registryDir = join(webDir, 'registry');
const WIDTH = 80;

const isScalar = (value: unknown) =>
  typeof value !== 'object' || value === null;

/** Format a JSON value the way the committed Registry files are written. */
const format = (value: unknown, indent = 0, prefixLength = 0): string => {
  const pad = '  '.repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    if (value.every(isScalar)) {
      const inline = `[${value.map((entry) => JSON.stringify(entry)).join(', ')}]`;

      if (prefixLength + inline.length <= WIDTH) {
        return inline;
      }

      return `[\n${value.map((entry) => `${pad}  ${JSON.stringify(entry)}`).join(',\n')}\n${pad}]`;
    }

    return `[\n${value.map((entry) => `${pad}  ${format(entry, indent + 1)}`).join(',\n')}\n${pad}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return '{}';
    }

    return `{\n${entries
      .map(([key, entry]) => {
        const prefix = `${pad}  ${JSON.stringify(key)}: `;
        return `${prefix}${format(entry, indent + 1, prefix.length)}`;
      })
      .join(',\n')}\n${pad}}`;
  }

  return JSON.stringify(value);
};

/** Read an item's source files as one string. */
const readItemSource = async (item: RegistryItem) =>
  (
    await Promise.all(
      (item.files ?? []).map((file) =>
        readFile(join(webDir, file.path), 'utf8')
      )
    )
  ).join('\n');

/** Replace an item's state `cssVars` with the ones its source derives. */
const withDerivedCssVars = async (item: RegistryItem) => {
  const cssVars =
    item.type === 'registry:ui'
      ? stateCssVarsForSource(await readItemSource(item))
      : undefined;
  const ordered: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(item)) {
    if (key === 'cssVars') {
      continue;
    }

    ordered[key] = value;

    if (key === 'type' && cssVars) {
      ordered.cssVars = cssVars;
    }
  }

  return ordered;
};

/** Rewrite one Style's Registry with the state Tokens its sources reference. */
const syncStyle = async (style: string) => {
  const path = join(registryDir, style, 'registry.json');
  const catalog = JSON.parse(await readFile(path, 'utf8')) as {
    items: RegistryItem[];
  };
  const items = await Promise.all(catalog.items.map(withDerivedCssVars));

  await writeFile(path, `${format({ ...catalog, items })}\n`);
};

for (const style of STYLES) {
  // biome-ignore lint/performance/noAwaitInLoops: each Style owns its Registry file
  await syncStyle(style.name);
}
