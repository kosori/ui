import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readCatalog } from '../lib/registry/catalog';

const webDir = join(import.meta.dirname, '..');
const versionPath = join(webDir, '..', '..', 'VERSION.md');

type Pin = {
  coss: string;
  hash: string;
  kosori: string;
};

/**
 * Components kosori serves without a coss/ui counterpart, so there is no
 * upstream revision to pin.
 */
const NO_UPSTREAM = new Set(['aspect-ratio', 'direction']);

/** Read the pin record's entry rows, ignoring the revision table. */
const readPins = async (): Promise<Pin[]> => {
  const source = await readFile(versionPath, 'utf8');

  return source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && line.endsWith('|'))
    .map((line) =>
      line
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim())
    )
    .filter(
      (cells) =>
        cells.length === 3 &&
        /^[a-z][a-z-]*$/.test(cells[0]) &&
        /^[0-9a-f]{64}$/.test(cells[2])
    )
    .map(([kosori, coss, hash]) => ({ coss, hash, kosori }));
};

test('the pin record covers every Port in the catalog', async () => {
  const pins = await readPins();
  const catalog = await readCatalog('zen');
  const ports = catalog
    .filter((item) => item.type !== 'registry:example')
    .map((item) => item.name)
    .filter((name) => !NO_UPSTREAM.has(name));

  expect(new Set(pins.map((pin) => pin.kosori))).toEqual(new Set(ports));
});

test('the pin record orders one row per Port with a sha256', async () => {
  const pins = await readPins();
  const pairKeys = pins.map((pin) => `${pin.kosori}/${pin.coss}`);

  expect(pins.map((pin) => pin.kosori)).toEqual(
    pins.map((pin) => pin.kosori).toSorted()
  );
  expect(new Set(pairKeys).size).toBe(pins.length);

  for (const pin of pins) {
    expect(pin.hash, `${pin.kosori} has no sha256`).toMatch(/^[0-9a-f]{64}$/);
  }
});
