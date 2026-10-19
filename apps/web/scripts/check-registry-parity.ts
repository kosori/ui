import { readdir, readFile } from 'node:fs/promises';
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
const registryDir = join(webDir, 'registry');
const docsDir = join(webDir, 'content/docs');

/** Registry folders shared by every Style rather than owned by one. */
const SHARED_REGISTRY_DIRS = new Set(['base-colors']);

/** The directory names directly below a directory. */
const directoryNames = async (dir: string) => {
  const entries = await readdir(dir, { withFileTypes: true });

  return new Set(
    entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  );
};

/** Read the items a published Style's catalog serves, keyed by name. */
const readCatalog = async (style: string) => {
  const catalog: Catalog = JSON.parse(
    await readFile(join(registryDir, style, 'registry.json'), 'utf8')
  );

  return new Map(catalog.items.map((item) => [item.name, item.type]));
};

const registryStyles = await directoryNames(registryDir);
for (const shared of SHARED_REGISTRY_DIRS) {
  registryStyles.delete(shared);
}
const docsStyles = await directoryNames(docsDir);
const presetStyles = new Set<string>(STYLES.map((style) => style.name));

// A Style is a preset, a registry directory and a documentation directory. All
// three sets must match, or a Style is advertised without being installable.
const styleNames = new Set([...registryStyles, ...docsStyles, ...presetStyles]);
const missing = [...styleNames].flatMap((name) => {
  const absent = [
    ...(registryStyles.has(name) ? [] : [`registry/${name}`]),
    ...(docsStyles.has(name) ? [] : [`content/docs/${name}`]),
    ...(presetStyles.has(name) ? [] : [`preset ${name}`]),
  ];

  return absent.length > 0 ? [`${name} is missing ${absent.join(', ')}`] : [];
});

if (missing.length > 0) {
  throw new Error(
    `Registry parity failed. A Style must have a preset, a registry directory and a documentation directory.\n${missing.join('\n')}`
  );
}

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
