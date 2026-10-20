import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readCatalog } from '../lib/registry/catalog';
import { COMPOSITIONS } from '../lib/registry/compositions';
import { PENDING_COMPONENTS } from '../lib/registry/pending';
import { findStyle, STYLES } from '../registry/preset';

const docsDir = join(import.meta.dirname, '../content/docs');

/** The documentation pages a Style publishes in its menu. */
const readPages = async (style: string) => {
  const meta: { pages: string[] } = JSON.parse(
    await readFile(join(docsDir, style, 'meta.json'), 'utf8')
  );

  return meta.pages;
};

/** One read of every Style's catalog, menu and declared Compositions. */
const readStyleFacts = () =>
  Promise.all(
    STYLES.map(async (style) => ({
      catalog: await readCatalog(style.name),
      compositions: findStyle(style.name)?.compositions ?? [],
      name: style.name,
      pages: await readPages(style.name),
    }))
  );

test('a Pending name is never served, documented or linked', async () => {
  const styles = await readStyleFacts();

  for (const { catalog, name, pages } of styles) {
    const names = new Set(catalog.map((item) => item.name));

    for (const pending of PENDING_COMPONENTS) {
      expect(
        names.has(pending),
        `${name} serves ${pending}, which is Pending`
      ).toBe(false);
      expect(
        names.has(`${pending}-example`),
        `${name} ships an Example for Pending ${pending}`
      ).toBe(false);
      expect(
        pages,
        `${name} lists Pending ${pending} in the menu`
      ).not.toContain(pending);
      expect(
        existsSync(join(docsDir, name, `${pending}.mdx`)),
        `${name} has a page for Pending ${pending}`
      ).toBe(false);
    }
  }
});

test('a Composition has a page but no installable name', async () => {
  const styles = await readStyleFacts();

  for (const { catalog, compositions, name, pages } of styles) {
    const names = new Set(catalog.map((item) => item.name));

    for (const composition of COMPOSITIONS) {
      expect(
        names.has(composition),
        `${name} serves Composition ${composition} as an item`
      ).toBe(false);
      expect(
        names.has(`${composition}-example`),
        `${name} ships an Example for Composition ${composition}`
      ).toBe(false);
      expect(
        PENDING_COMPONENTS as readonly string[],
        `${composition} is a Composition and also Pending`
      ).not.toContain(composition);
    }

    for (const composition of compositions) {
      expect(pages, `${name} does not list ${composition}`).toContain(
        composition
      );
      expect(
        existsSync(join(docsDir, name, `${composition}.mdx`)),
        `${name} has no page for Composition ${composition}`
      ).toBe(true);
    }
  }
});

test('the two trivial names are served with an Example and a page', async () => {
  const names = new Set((await readCatalog('zen')).map(({ name }) => name));
  const pages = await readPages('zen');

  for (const name of ['aspect-ratio', 'direction']) {
    expect(names, `zen does not serve ${name}`).toContain(name);
    expect(names, `zen ships no ${name} Example`).toContain(`${name}-example`);
    expect(pages, `zen does not list ${name}`).toContain(name);
    expect(
      existsSync(join(docsDir, 'zen', `${name}.mdx`)),
      `zen has no ${name} page`
    ).toBe(true);
    expect(
      PENDING_COMPONENTS as readonly string[],
      `${name} is Pending`
    ).not.toContain(name);
    expect(
      COMPOSITIONS as readonly string[],
      `${name} is a Composition`
    ).not.toContain(name);
  }
});

test('an Incomplete Style reports its own scope, not the global Pending list', () => {
  expect(findStyle('kaze')?.incomplete).toBe(true);
  expect(findStyle('kaze')?.pending ?? []).toEqual([]);
  expect(findStyle('kaze')?.compositions ?? []).toEqual([]);
  expect(findStyle('zen')?.pending).toEqual([...PENDING_COMPONENTS]);
  expect(findStyle('zen')?.compositions).toEqual([...COMPOSITIONS]);
});

test('sonner is absent everywhere except the toast explanation', async () => {
  const styles = await readStyleFacts();

  expect(PENDING_COMPONENTS as readonly string[]).not.toContain('sonner');
  expect(COMPOSITIONS as readonly string[]).not.toContain('sonner');

  for (const { catalog, name, pages } of styles) {
    const names = new Set(catalog.map((item) => item.name));

    expect(names.has('sonner'), `${name} serves sonner`).toBe(false);
    expect(names.has('sonner-example'), `${name} ships sonner`).toBe(false);
    expect(pages, `${name} links sonner`).not.toContain('sonner');
    expect(
      existsSync(join(docsDir, name, 'sonner.mdx')),
      `${name} has a sonner page`
    ).toBe(false);
  }

  expect(await readFile(join(docsDir, 'zen/toast.mdx'), 'utf8')).toContain(
    'sonner'
  );
});
