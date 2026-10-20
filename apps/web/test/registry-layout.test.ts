import { expect, test } from 'bun:test';
import { join } from 'node:path';
import { readCatalog } from '../lib/registry/catalog';
import { STYLES } from '../registry/preset';

/** The directory each Registry item type keeps its sources under. */
const TYPE_DIRS: Record<string, string> = {
  'registry:block': 'blocks',
  'registry:example': 'examples',
  'registry:hook': 'hooks',
  'registry:lib': 'lib',
  'registry:ui': 'ui',
};

/**
 * Styles whose flat registry layout predates the split. They keep it, frozen, so
 * the layout rule applies to every Style authored after the split instead.
 */
const FLAT_STYLES = new Set(['kaze']);

test('every catalog item lives in the directory its type owns', async () => {
  const catalogs = await Promise.all(
    STYLES.filter(({ name }) => !FLAT_STYLES.has(name)).map(
      async ({ name }) => ({ items: await readCatalog(name), name })
    )
  );
  const violations: string[] = [];

  for (const { items, name } of catalogs) {
    for (const item of items) {
      const dir = TYPE_DIRS[item.type];
      if (!dir) {
        violations.push(`${name}/${item.name} has unknown type ${item.type}`);
        continue;
      }

      const expected = join('registry', name, dir);

      for (const file of item.files) {
        if (!file.path.startsWith(`${expected}/`)) {
          violations.push(
            `${name}/${item.name} ships ${file.path}, expected under ${expected}/`
          );
        }
      }
    }
  }

  expect(violations, 'a Registry item is outside its type directory').toEqual(
    []
  );
});
