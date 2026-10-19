import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { STYLES } from '../registry/preset';

type Item = {
  name: string;
  type: string;
};

type Catalog = {
  items: Item[];
};

const webDir = join(import.meta.dirname, '..');

/** Read the items a published Style's catalog serves, keyed by name. */
const readCatalog = async (style: string) => {
  const catalog: Catalog = JSON.parse(
    await readFile(join(webDir, `registry/${style}/registry.json`), 'utf8')
  );

  return new Map(catalog.items.map((item) => [item.name, item.type]));
};

const catalogs = new Map(
  await Promise.all(
    STYLES.map(
      async (style) => [style.name, await readCatalog(style.name)] as const
    )
  )
);

const published = [...catalogs.keys()];
const union = new Set(
  [...catalogs.values()].flatMap((items) => [...items.keys()])
);

const problems = published.flatMap((style) => {
  const items = catalogs.get(style);

  return [...union].flatMap((name) => {
    const type = items?.get(name);

    if (type) {
      return [];
    }

    const servedBy = published.filter((other) =>
      catalogs.get(other)?.has(name)
    );

    return [
      `${style} does not serve "${name}" (served by ${servedBy.join(', ')})`,
    ];
  });
});

const mismatched = published.flatMap((style) => {
  const items = catalogs.get(style);

  return [...union].flatMap((name) => {
    const type = items?.get(name);
    const expected = [...catalogs.values()]
      .find((other) => other.has(name))
      ?.get(name);

    if (!type || type === expected) {
      return [];
    }

    return [`${style} serves "${name}" as ${type}, expected ${expected}`];
  });
});

const failures = [...problems, ...mismatched];

if (failures.length > 0) {
  throw new Error(
    `Registry parity failed. Every published Style must serve every item.\n${failures.join('\n')}`
  );
}
