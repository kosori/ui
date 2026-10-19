import { expect, test } from 'bun:test';
import { spawn } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const webDir = join(import.meta.dirname, '..');

type Item = {
  name: string;
  type: string;
};

type Catalog = {
  items: Item[];
};

/** Run the Registry parity task to completion, capturing its output. */
const runParity = (root: string) =>
  new Promise<{ exitCode: number; output: string }>((resolve, reject) => {
    const child = spawn(
      'bun',
      [join(root, 'scripts/check-registry-parity.ts')],
      {
        cwd: root,
      }
    );
    let output = '';
    child.stdout.on('data', (chunk: Buffer) => {
      output += chunk.toString();
    });
    child.stderr.on('data', (chunk: Buffer) => {
      output += chunk.toString();
    });
    child.on('error', reject);
    child.on('exit', (code) => resolve({ exitCode: code ?? 1, output }));
  });

/** Copy the parity task, the catalogs and the documentation into a scratch tree. */
const createTree = async () => {
  const root = await mkdtemp(join(tmpdir(), 'kosori-parity-'));

  await Promise.all([
    cp(
      join(webDir, 'scripts/check-registry-parity.ts'),
      join(root, 'scripts/check-registry-parity.ts')
    ),
    cp(join(webDir, 'registry'), join(root, 'registry'), { recursive: true }),
    cp(join(webDir, 'content/docs'), join(root, 'content/docs'), {
      recursive: true,
    }),
  ]);

  return root;
};

/** Append an item to a Style's catalog, the way a new component would arrive. */
const addItem = async (root: string, style: string, item: Item) => {
  const path = join(root, `registry/${style}/registry.json`);
  const catalog: Catalog = JSON.parse(await readFile(path, 'utf8'));

  catalog.items.push(item);
  await writeFile(path, `${JSON.stringify(catalog, null, 2)}\n`);
};

/** Remove the incomplete declaration so every Style is held to full coverage. */
const declareComplete = async (root: string) => {
  const path = join(root, 'registry/preset.ts');
  const source = await readFile(path, 'utf8');

  await writeFile(path, source.replace(/\n\s*incomplete: true,/, ''));
};

test('an incomplete Style may omit an item a complete Style serves', async () => {
  const root = await createTree();

  try {
    await addItem(root, 'zen', { name: 'fixture-only', type: 'registry:ui' });

    const parity = await runParity(root);
    expect(parity.exitCode, parity.output).toBe(0);
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test('a complete Style must serve every item another complete Style serves', async () => {
  const root = await createTree();

  try {
    await addItem(root, 'zen', { name: 'fixture-only', type: 'registry:ui' });
    await declareComplete(root);

    const parity = await runParity(root);
    expect(parity.exitCode, parity.output).not.toBe(0);
    expect(parity.output).toContain(
      'kaze does not serve "fixture-only" (served by zen)'
    );
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test('two Styles must agree on the type of an item they share', async () => {
  const root = await createTree();

  try {
    await addItem(root, 'zen', { name: 'fixture-only', type: 'registry:ui' });
    await addItem(root, 'kaze', { name: 'fixture-only', type: 'registry:lib' });

    const parity = await runParity(root);
    expect(parity.exitCode, parity.output).not.toBe(0);
    expect(parity.output).toContain(
      'kaze serves "fixture-only" as registry:lib, expected registry:ui'
    );
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});
