import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readCatalog } from '../lib/registry/catalog';
import { COMPOSITIONS } from '../lib/registry/compositions';
import { PENDING_COMPONENTS } from '../lib/registry/pending';
import { findStyle, STYLES } from '../registry/preset';

const docsDir = join(import.meta.dirname, '../content/docs');
const registryDir = join(import.meta.dirname, '../registry');
const iconOnlyControlPattern = /(?:Button|Clear|Close|Remove|Trigger)$/;
const iconElementPattern =
  /^<([A-Z][\w.]*)(?:\s[^>]*)?\/>$|^<([A-Z][\w.]*)(?:\s[^>]*)?>[\s\S]*<\/\2>$/;

/** The end of a JSX opening tag, allowing expressions and quoted strings. */
const openingTagEnd = (source: string, start: number) => {
  let quote: string | null = null;
  let braces = 0;

  for (let cursor = start; cursor < source.length; cursor += 1) {
    const char = source[cursor];

    if (quote) {
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
    } else if (char === '{') {
      braces += 1;
    } else if (char === '}') {
      braces -= 1;
    } else if (char === '>' && braces === 0) {
      return cursor;
    }
  }

  return -1;
};

/** The icon-only controls a component source renders. */
const iconOnlyControls = (source: string) => {
  const controls: { name: string; opening: string }[] = [];

  for (const match of source.matchAll(/<([A-Z][\w.]*)/g)) {
    const [, name] = match;
    const start = match.index ?? 0;
    const end = openingTagEnd(source, start + match[0].length);

    if (!name || end === -1 || !iconOnlyControlPattern.test(name)) {
      continue;
    }

    const opening = source.slice(start, end + 1);
    if (opening.endsWith('/>')) {
      continue;
    }

    const closing = `</${name}>`;
    const closeIndex = source.indexOf(closing, end + 1);
    if (closeIndex === -1) {
      continue;
    }

    const children = source
      .slice(end + 1, closeIndex)
      .replace(/\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\}/g, '')
      .trim();

    if (iconElementPattern.test(children)) {
      controls.push({ name, opening });
    }
  }

  return controls;
};

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
        PENDING_COMPONENTS,
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
    expect(PENDING_COMPONENTS, `${name} is Pending`).not.toContain(name);
    expect(COMPOSITIONS, `${name} is a Composition`).not.toContain(name);
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

  expect(PENDING_COMPONENTS).not.toContain('sonner');
  expect(COMPOSITIONS).not.toContain('sonner');

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

test('every icon-only control in autocomplete and combobox has a name', async () => {
  const sources = await Promise.all(
    ['autocomplete', 'combobox'].map(async (item) => ({
      item,
      source: await readFile(
        join(registryDir, 'zen/ui', `${item}.tsx`),
        'utf8'
      ),
    }))
  );
  const missing: string[] = [];

  for (const { item, source } of sources) {
    for (const control of iconOnlyControls(source)) {
      if (!/\baria-label=/.test(control.opening)) {
        missing.push(`${item}: ${control.name}`);
      }
    }
  }

  expect(missing, 'an icon-only control has no accessible name').toEqual([]);
});
