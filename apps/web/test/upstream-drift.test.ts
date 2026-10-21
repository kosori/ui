import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  classifyDrift,
  type DriftReport,
  parsePinRows,
  renderReport,
} from '../lib/registry/upstream-drift';

const versionPath = join(import.meta.dirname, '..', '..', '..', 'VERSION.md');

const HASH_A = 'a'.repeat(64);
const HASH_B = 'b'.repeat(64);
const HASH_C = 'c'.repeat(64);
const HASH_D = 'd'.repeat(64);

const DRIFT: DriftReport = {
  changed: [{ coss: 'button', kosori: 'button', sha256: HASH_A }],
  newItems: ['brand-new'],
  removed: [{ coss: 'old', kosori: 'old', sha256: HASH_C }],
  unreachable: ['tabs'],
};

test('the pin file parses one 64-hex row per kosori name', async () => {
  const source = await readFile(versionPath, 'utf8');
  const pins = parsePinRows(source);

  expect(pins.length).toBeGreaterThan(0);
  expect(new Set(pins.map((pin) => pin.kosori)).size).toBe(pins.length);
  expect(pins.map((pin) => pin.kosori)).not.toContain('Research date');

  for (const pin of pins) {
    expect(pin.sha256, `${pin.kosori} has no sha256`).toMatch(/^[0-9a-f]{64}$/);
  }
});

test('a coss annotation records the registry item name', async () => {
  const source = await readFile(versionPath, 'utf8');
  const pin = parsePinRows(source).find((row) => row.kosori === 'field');

  expect(pin?.coss).toBe('field');
});

test('drift lands in changed, new, removed and unreachable buckets', () => {
  const report = classifyDrift({
    currentHashes: new Map([
      ['button', HASH_D],
      ['tabs', HASH_A],
    ]),
    pins: [
      { coss: 'button', kosori: 'button', sha256: HASH_A },
      { coss: 'tabs', kosori: 'tabs', sha256: HASH_B },
      { coss: 'old', kosori: 'old', sha256: HASH_C },
      { coss: 'use-media-query', kosori: 'use-media-query', sha256: HASH_D },
    ],
    unreachable: ['tabs'],
    upstreamNames: ['button', 'tabs', 'brand-new', 'use-media-query'],
    upstreamUiNames: ['button', 'tabs', 'brand-new'],
  });

  expect(report.changed.map((pin) => pin.kosori)).toEqual(['button']);
  expect(report.newItems).toEqual(['brand-new']);
  expect(report.removed.map((pin) => pin.kosori)).toEqual(['old']);
  expect(report.unreachable).toEqual(['tabs']);
  expect(report.changed.map((pin) => pin.kosori)).not.toContain('tabs');
});

test('the report renders actionable and informational sections', () => {
  const markdown = renderReport(DRIFT);

  expect(markdown).toContain('Actionable: pinned bytes changed');
  expect(markdown).toContain('Removed upstream');
  expect(markdown).toContain('Informational: upstream catalog grew');
  expect(markdown).toContain('brand-new');
  expect(markdown).toContain('tabs');
});

test('a clean report states that nothing drifted', () => {
  const markdown = renderReport({
    changed: [],
    newItems: [],
    removed: [],
    unreachable: [],
  });

  expect(markdown).toContain('No upstream drift');
  expect(markdown).not.toContain('Actionable: pinned bytes changed');
});
