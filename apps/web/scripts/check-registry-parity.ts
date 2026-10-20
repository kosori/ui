import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { readCatalog } from '../lib/registry/catalog';
import { STYLES } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');
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

const registryStyles = await directoryNames(join(webDir, 'registry'));
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
    STYLES.map(async (style) => {
      const items = await readCatalog(style.name);

      return [
        style.name,
        new Map(items.map((item) => [item.name, item.type])),
      ] as const;
    })
  )
);

const published = [...catalogs.keys()];
const stylesByName = new Map(STYLES.map((style) => [style.name, style]));
const complete = published.filter(
  (style) => !stylesByName.get(style)?.incomplete
);
const coverage = new Set(
  complete.flatMap((style) => [...(catalogs.get(style)?.keys() ?? [])])
);
const served = new Set(
  published.flatMap((style) => [...(catalogs.get(style)?.keys() ?? [])])
);

const problems = complete.flatMap((style) => {
  const items = catalogs.get(style);

  return [...coverage].flatMap((name) => {
    if (items?.has(name)) {
      return [];
    }

    const servedBy = complete.filter((other) => catalogs.get(other)?.has(name));

    return [
      `${style} does not serve "${name}" (served by ${servedBy.join(', ')})`,
    ];
  });
});

const mismatched = published.flatMap((style) => {
  const items = catalogs.get(style);

  return [...served].flatMap((name) => {
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
    `Registry parity failed. Every complete published Style must serve every item another complete Style serves, and every Style must agree on an item's type.\n${failures.join('\n')}`
  );
}
