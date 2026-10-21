import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { Compatibility } from '../components/compatibility';
import { readCatalog } from '../lib/registry/catalog';
import {
  ALIASES,
  FIELD_COMPATIBILITY,
  getCompatibilityFacts,
  ICON_SUBSTITUTION,
  INPUT_OTP_ADAPTER,
  readStyleExports,
  readStyleSource,
  SYNTHESIZED_EXPORTS,
  TOAST_SURFACE,
} from '../lib/registry/compatibility';
import { COMPOSITIONS } from '../lib/registry/compositions';
import { PENDING_COMPONENTS } from '../lib/registry/pending';
import { findStyle, STATE_TOKEN_NAMES, STYLES } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');
const docsDir = join(webDir, 'content/docs');
const registryDir = join(webDir, 'registry');

test('every alias the page claims exists in its component module', async () => {
  const claims = await Promise.all(
    ALIASES.map(async (claim) => ({
      claim,
      module: await readStyleExports('zen', claim.item),
    }))
  );

  for (const { claim, module } of claims) {
    const { item, local, name } = claim;

    expect(module.names.has(name), `${item} does not export ${name}`).toBe(
      true
    );
    expect(
      module.names.has(local),
      `${item} does not export ${local}, the target of ${name}`
    ).toBe(true);
    expect(
      module.aliases.get(name),
      `${item} does not export ${name} as ${local}`
    ).toBe(local);
  }
});

test('a Style reports exactly the aliases its own modules export', async () => {
  const styles = await Promise.all(
    STYLES.map(async ({ name }) => {
      const facts = await getCompatibilityFacts(name);
      const modules = await Promise.all(
        facts.served.map(async (item) => ({
          item,
          module: await readStyleExports(name, item),
        }))
      );
      const derived = modules.flatMap(({ item, module }) =>
        [...module.aliases]
          .filter(([aliasName]) => !aliasName.endsWith('Primitive'))
          .map(([aliasName, local]) => `${item}/${aliasName}/${local}`)
      );

      return { derived, facts, name };
    })
  );

  for (const { derived, facts, name } of styles) {
    expect(
      facts.aliases.map(
        ({ item, local, name: aliasName }) => `${item}/${aliasName}/${local}`
      ),
      `${name} does not report the aliases its modules export`
    ).toEqual(derived);
  }
});

test('every synthesized shadcn/ui name the page claims is exported', async () => {
  const claims = await Promise.all(
    SYNTHESIZED_EXPORTS.map(async (claim) => ({
      claim,
      module: await readStyleExports('zen', claim.item),
    }))
  );

  for (const { claim, module } of claims) {
    for (const name of claim.names) {
      expect(
        module.names.has(name),
        `${claim.item} does not export ${name}`
      ).toBe(true);
    }
  }
});

test('an exported name is an alias or synthesized, never both', () => {
  const aliases = new Set(ALIASES.map(({ name }) => name));
  const duplicated = SYNTHESIZED_EXPORTS.flatMap(({ names }) =>
    names.filter((name) => aliases.has(name))
  );

  expect(duplicated, 'a name is claimed as both alias and synthesized').toEqual(
    []
  );
});

test('Field is a divergence only where the module lacks the shadcn/ui parts', async () => {
  const field = await readStyleExports('zen', 'field');

  for (const name of FIELD_COMPATIBILITY.shared) {
    expect(field.names.has(name), `zen/field does not export ${name}`).toBe(
      true
    );
  }

  for (const name of FIELD_COMPATIBILITY.shadcnOnly) {
    expect(
      field.names.has(name),
      `zen/field exports ${name}, so the Field divergence would be stale`
    ).toBe(false);
  }

  for (const name of FIELD_COMPATIBILITY.kosoriOnly) {
    expect(field.names.has(name), `zen/field does not export ${name}`).toBe(
      true
    );
  }

  const zen = await getCompatibilityFacts('zen');
  const kaze = await getCompatibilityFacts('kaze');

  expect(
    zen.divergences.map(({ id }) => id),
    'zen does not document the Field divergence'
  ).toContain('field');
  expect(
    kaze.divergences.map(({ id }) => id),
    'kaze documents a Field divergence although its Field exports FieldGroup'
  ).not.toContain('field');
});

test('the InputOTP adapter the page describes matches its module', async () => {
  const module = await readStyleExports('zen', 'input-otp');
  const source = await readStyleSource('zen', 'input-otp');

  for (const name of INPUT_OTP_ADAPTER.exports) {
    expect(module.names.has(name), `input-otp does not export ${name}`).toBe(
      true
    );
  }

  expect(
    source,
    'InputOTPSlot no longer takes an index, so the adapter copy is stale'
  ).toContain('index: number');

  const zen = await getCompatibilityFacts('zen');
  const kaze = await getCompatibilityFacts('kaze');

  expect(zen.divergences.map(({ id }) => id)).toContain('input-otp');
  expect(kaze.divergences.map(({ id }) => id)).not.toContain('input-otp');
});

test('the toast surface the page describes matches its module', async () => {
  const module = await readStyleExports('zen', 'toast');
  const source = await readStyleSource('zen', 'toast');

  for (const name of TOAST_SURFACE.exports) {
    expect(module.names.has(name), `toast does not export ${name}`).toBe(true);
  }

  expect(
    source,
    'toast no longer builds on Base UI, so the adapter copy is stale'
  ).toContain(TOAST_SURFACE.base);

  const zen = await getCompatibilityFacts('zen');

  expect(zen.divergences.map(({ id }) => id)).toContain('toast');
});

test('sonner is absent from every catalog and named as absent by the page', async () => {
  expect(PENDING_COMPONENTS).not.toContain('sonner');
  expect(COMPOSITIONS).not.toContain('sonner');

  const styles = await Promise.all(
    STYLES.map(async ({ name }) => ({
      catalog: new Set((await readCatalog(name)).map((item) => item.name)),
      facts: await getCompatibilityFacts(name),
      name,
    }))
  );

  for (const { catalog, facts, name } of styles) {
    expect(catalog.has('sonner'), `${name} serves sonner`).toBe(false);
    expect(
      catalog.has('sonner-example'),
      `${name} ships a sonner Example`
    ).toBe(false);

    const sonner = facts.divergences.find(({ id }) => id === 'sonner');

    expect(sonner, `${name} does not explain sonner`).toBeDefined();
    expect(sonner?.code, `${name} does not point at sonner`).toContain(
      'sonner'
    );
    expect(
      sonner?.body,
      `${name} does not derive its sonner copy from what it serves`
    ).toContain(
      facts.served.includes('toast') ? 'serves toast' : 'serves no toast'
    );
  }
});

test('the state Token divergence lists the preset names', async () => {
  const zen = await getCompatibilityFacts('zen');
  const tokens = zen.divergences.find(({ id }) => id === 'tokens');

  expect(tokens?.code).toEqual([...STATE_TOKEN_NAMES]);
});

test('the icon substitution the page describes matches the preset and sources', async () => {
  for (const style of STYLES) {
    expect(
      style.config.iconLibrary,
      `${style.name} does not use the Tabler icon library`
    ).toBe(ICON_SUBSTITUTION.iconLibrary);
  }

  const files = await Promise.all(
    STYLES.map(async ({ name }) => {
      const dir = join(registryDir, name, 'ui');
      const root = existsSync(dir) ? dir : join(registryDir, name);
      const entries = await readdir(root);

      return entries
        .filter((entry) => entry.endsWith('.tsx'))
        .map((entry) => join(root, entry));
    })
  ).then((paths) => paths.flat());
  const sources = await Promise.all(
    files.map((path) => readFile(path, 'utf8'))
  );

  expect(
    sources.some((source) => source.includes(ICON_SUBSTITUTION.package)),
    `no component imports ${ICON_SUBSTITUTION.package}`
  ).toBe(true);

  for (const [index, source] of sources.entries()) {
    expect(
      source.includes(ICON_SUBSTITUTION.upstream),
      `${files[index]} imports ${ICON_SUBSTITUTION.upstream}`
    ).toBe(false);
  }
});

test('Pending and Compositions come from each Style own data', async () => {
  const zen = await getCompatibilityFacts('zen');
  const kaze = await getCompatibilityFacts('kaze');
  const kazeStyle = findStyle('kaze');

  expect(zen.pending).toEqual([...PENDING_COMPONENTS]);
  expect(zen.compositions).toEqual([...COMPOSITIONS]);
  expect(zen.notServed).toEqual([]);

  expect(kaze.pending).toEqual([...(kazeStyle?.pending ?? [])]);
  expect(kaze.compositions).toEqual([...(kazeStyle?.compositions ?? [])]);
  expect(kaze.incomplete).toBe(true);
  expect(kaze.pending).toEqual([]);
  expect(
    kaze.notServed,
    'kaze does not name a catalog name it leaves unserved'
  ).toContain('toast');
});

test('every Authored catalog item appears once in its Style facts', async () => {
  const styles = await Promise.all(
    STYLES.map(async ({ name }) => ({
      catalog: await readCatalog(name),
      facts: await getCompatibilityFacts(name),
      name,
    }))
  );

  for (const { catalog, facts, name } of styles) {
    const expected = catalog
      .filter(
        (item) => item.type === 'registry:ui' && item.meta?.authored === true
      )
      .map((item) => item.name)
      .sort();

    expect(
      facts.authored,
      `${name} does not report its Authored items`
    ).toEqual(expected);
    expect(
      new Set(facts.authored).size,
      `${name} reports an Authored item more than once`
    ).toBe(facts.authored.length);
  }
});

test('an Authored name is neither Pending nor a Composition', async () => {
  const styles = await Promise.all(
    STYLES.map(async ({ name }) => ({
      facts: await getCompatibilityFacts(name),
      name,
    }))
  );

  for (const { facts, name } of styles) {
    for (const authored of facts.authored) {
      expect(
        facts.pending,
        `${name} lists the Authored ${authored} as Pending`
      ).not.toContain(authored);
      expect(
        facts.compositions,
        `${name} lists the Authored ${authored} as a Composition`
      ).not.toContain(authored);
      expect(PENDING_COMPONENTS, `${authored} is Pending`).not.toContain(
        authored
      );
      expect(COMPOSITIONS, `${authored} is a Composition`).not.toContain(
        authored
      );
    }
  }
});

test('every Authored name has no VERSION.md pin row', async () => {
  const source = await readFile(join(webDir, '..', '..', 'VERSION.md'), 'utf8');
  const pinned = new Set(
    source
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
      .map(([name]) => name)
  );

  const styles = await Promise.all(
    STYLES.map(async ({ name }) => ({
      facts: await getCompatibilityFacts(name),
      name,
    }))
  );

  for (const { facts, name } of styles) {
    for (const authored of facts.authored) {
      expect(
        pinned.has(authored),
        `${name} pins the Authored ${authored} to an upstream revision`
      ).toBe(false);
    }
  }
});

test('the page renders Authored names or says the Style serves none', async () => {
  const zen = renderToStaticMarkup(await Compatibility({ style: 'zen' }));
  const kaze = renderToStaticMarkup(await Compatibility({ style: 'kaze' }));

  expect(zen, 'zen does not render the Authored section').toContain('Authored');
  expect(zen, 'zen does not list its Authored names').toContain(
    'native-select'
  );
  expect(zen, 'zen claims to serve no Authored components').not.toContain(
    'zen serves no Authored components'
  );
  expect(kaze, 'kaze does not say it serves no Authored components').toContain(
    'kaze serves no Authored components'
  );
});

test('the Compatibility page is reachable from every Style menu', async () => {
  const pages = await Promise.all(
    STYLES.map(async ({ name }) => {
      const meta: { pages: string[] } = JSON.parse(
        await readFile(join(docsDir, name, 'meta.json'), 'utf8')
      );
      const path = join(docsDir, name, 'compatibility.mdx');

      return {
        meta,
        name,
        page: existsSync(path) ? await readFile(path, 'utf8') : undefined,
      };
    })
  );

  for (const { meta, name, page } of pages) {
    expect(meta.pages, `${name} does not link Compatibility`).toContain(
      'compatibility'
    );
    expect(page, `${name} has no Compatibility page`).toBeDefined();
    expect(
      page,
      `${name} hard-codes a table instead of rendering the generated facts`
    ).toContain('<Compatibility />');
  }
});
