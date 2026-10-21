import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CAPTURE_DIR, captureManifest } from '../scripts/capture/manifest';

const webDir = join(import.meta.dirname, '..');
const examplesDir = join(webDir, 'registry/zen/examples');
const workflowPath = join(webDir, '../../.github/workflows/visual.yml');

/** Every zen Example source, named the way its Registry item is. */
const exampleNames = async () =>
  (await readdir(examplesDir))
    .filter((file) => file.endsWith('-example.tsx'))
    .map((file) => file.replace(/-example\.tsx$/, ''))
    .sort();

test('the capture manifest covers every zen Example once in both schemes', async () => {
  const manifest = await captureManifest();
  const names = await exampleNames();

  expect(manifest.map(({ example }) => example).sort()).toEqual(names);
  expect(new Set(manifest.map(({ example }) => example)).size).toBe(
    manifest.length
  );

  for (const entry of manifest) {
    expect(entry.route.startsWith('/docs/zen/')).toBe(true);
  }
});

test('the capture workflow uploads proof and never gates on pixels', async () => {
  const workflow = await readFile(workflowPath, 'utf8');

  expect(workflow).toContain('actions/upload-artifact@');
  expect(workflow).toContain(`apps/web/${CAPTURE_DIR}`);
  expect(workflow).toMatch(/if: always\(\)/);
  expect(workflow).not.toMatch(/toHaveScreenshot|pixelmatch|odiff|ssim/i);
});
