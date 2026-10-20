import { expect, test } from 'bun:test';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  cp,
  mkdtemp,
  readdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join, relative } from 'node:path';
import type { RegistryItem } from 'shadcn/schema';
import { GET } from '../app/init/[style]/[baseColor]/route';
import { readCatalog } from '../lib/registry/catalog';
import { INTERNAL_ITEMS, isInternalItem } from '../lib/registry/internal';
import { PENDING_COMPONENTS } from '../lib/registry/pending';
import { BASE_COLORS } from '../registry/base-colors';
import { STYLES, styleRadius } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');
const fixtureDir = join(import.meta.dirname, 'fixtures/consumer');
const shadcn = join(webDir, 'node_modules/.bin/shadcn');
const tsc = join(webDir, 'node_modules/.bin/tsc');
const productionNamespace =
  'https://kosori.codingcodax.dev/r/{style}/{name}.json';

/**
 * Documentation pages that are not a catalog component. Every other page in a
 * Style's directory must belong to a `registry:ui` item, so a renamed or
 * deleted component cannot leave a page behind.
 */
const NON_COMPONENT_PAGES = [
  'components',
  'date-picker',
  'index',
  'installation',
  'theming',
];

/**
 * The semantic state Tokens coss ships. State colour is independent of Base
 * color, so every palette must declare these exact values.
 */
const STATE_TOKENS = {
  dark: {
    info: 'var(--color-blue-500)',
    'info-foreground': 'var(--color-blue-400)',
    success: 'var(--color-emerald-500)',
    'success-foreground': 'var(--color-emerald-400)',
    warning: 'var(--color-amber-500)',
    'warning-foreground': 'var(--color-amber-400)',
  },
  light: {
    info: 'var(--color-blue-500)',
    'info-foreground': 'var(--color-blue-700)',
    success: 'var(--color-emerald-500)',
    'success-foreground': 'var(--color-emerald-700)',
    warning: 'var(--color-amber-500)',
    'warning-foreground': 'var(--color-amber-700)',
  },
} as const;

/**
 * A Consumer file that pastes the shadcn/ui snippets for the components whose
 * export names differ from kosori's. Installing the catalog and typechecking it
 * proves the pasted snippets compile without edits.
 */
const SHADCN_ALIAS_SNIPPET = `'use client';

import * as React from 'react';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { ButtonGroup, buttonGroupVariants } from '@/components/ui/button-group';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
} from '@/components/ui/tabs';

export const ContextMenuSnippet = () => (
  <ContextMenu>
    <ContextMenuTrigger>Open</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuLabel inset>People</ContextMenuLabel>
      <ContextMenuGroup>
        <ContextMenuItem inset>Profile</ContextMenuItem>
        <ContextMenuCheckboxItem checked>Notifications</ContextMenuCheckboxItem>
        <ContextMenuRadioGroup value='top'>
          <ContextMenuRadioItem value='top'>Top</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Nested</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuShortcut>Cmd K</ContextMenuShortcut>
      </ContextMenuGroup>
    </ContextMenuContent>
  </ContextMenu>
);

const frameworks = ['Next.js', 'Remix'];

export const ComboboxSnippet = () => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox items={frameworks} multiple>
      <ComboboxChips>
        <ComboboxValue>
          {frameworks.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder='Add framework' />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            {frameworks.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
        <ComboboxSeparator />
      </ComboboxContent>
    </Combobox>
  );
};

export const AvatarSnippet = () => (
  <Avatar>
    <AvatarImage alt='Ada Lovelace' src='/ada.png' />
    <AvatarFallback>AL</AvatarFallback>
    <AvatarBadge />
  </Avatar>
);

const DayButton = (props: React.ComponentProps<typeof CalendarDayButton>) => (
  <CalendarDayButton {...props} />
);

export const CalendarSnippet = () => (
  <Calendar components={{ DayButton }} />
);

export const DrawerSnippet = () => (
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerSwipeHandle />
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes here.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerPortal>
  </Drawer>
);

export const InputGroupSnippet = () => (
  <InputGroup>
    <InputGroupInput placeholder='Search' />
    <InputGroupButton size='icon-xs'>Go</InputGroupButton>
  </InputGroup>
);

export const PopoverSnippet = () => (
  <Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Dimensions</PopoverTitle>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
);

const selectItems = [{ label: 'Next.js', value: 'next' }];

export const SelectSnippet = () => (
  <Select defaultValue='next' items={selectItems}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectScrollUpButton />
      <SelectItem value='next'>Next.js</SelectItem>
      <SelectScrollDownButton />
    </SelectContent>
  </Select>
);

export const ButtonGroupSnippet = () => (
  <ButtonGroup className={buttonGroupVariants({ orientation: 'horizontal' })}>
    <button type='button'>Left</button>
    <button type='button'>Right</button>
  </ButtonGroup>
);

export const TabsSnippet = () => (
  <Tabs defaultValue='account'>
    <TabsList
      className={tabsListVariants({ variant: 'line' })}
      variant='line'
    >
      <TabsTrigger value='account'>Account</TabsTrigger>
    </TabsList>
    <TabsContent value='account'>Make changes to your account here.</TabsContent>
  </Tabs>
);
`;

/** The directory shadcn installs a Registry item type into. */
const installedDirs: Record<string, string> = {
  'registry:example': 'components',
  'registry:hook': 'hooks',
  'registry:lib': 'lib',
  'registry:ui': 'components/ui',
};

/**
 * Where an install writes an item into a Consumer project. A type with no known
 * directory fails loudly rather than guessing a path.
 */
const installedPath = (item: RegistryItem, root: string) => {
  const dir = installedDirs[item.type];
  if (!dir) {
    throw new Error(
      `No install surface is known for Registry item type "${item.type}"`
    );
  }
  return join(root, dir, `${item.name}${extname(item.files[0].path)}`);
};

/** The directories the catalog's item types install into. */
const ITEM_DIRS = [...new Set(Object.values(installedDirs))];
const CSS_ENTRY = 'app/globals.css';
const DEPENDENCY_MANIFESTS = new Set([
  'bun.lock',
  'bun.lockb',
  'components.json',
  'package-lock.json',
  'package.json',
  'pnpm-lock.yaml',
  'yarn.lock',
]);
const isInstallSurface = (path: string) =>
  path === CSS_ENTRY ||
  ITEM_DIRS.some((dir) => path.startsWith(`${dir}/`)) ||
  DEPENDENCY_MANIFESTS.has(path);

/**
 * Read a project's tree as relative path to contents, skipping installed
 * dependencies. A byte-for-byte compare of two trees is how ADR-0003's install
 * surface is held to the whole project, not just its route files.
 */
const readTree = async (root: string) => {
  const tree = new Map<string, string>();

  const visit = async (dir: string): Promise<void> => {
    const entries = await readdir(dir, { withFileTypes: true });
    await Promise.all(
      entries.map(async (entry) => {
        if (entry.name === 'node_modules' || entry.name === '.next') {
          return;
        }

        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
          await visit(path);
          return;
        }
        if (entry.isFile()) {
          tree.set(relative(root, path), await readFile(path, 'utf8'));
        }
      })
    );
  };

  await visit(root);
  return tree;
};

/**
 * The shape shadcn's CLI expects from `${REGISTRY_URL}/colors/<baseColor>.json`.
 * The Tokens under test come from our preset, so the values here stay empty.
 */
const baseColorDoc = {
  cssVars: { dark: {}, light: {} },
  cssVarsTemplate: '',
  inlineColors: { dark: {}, light: {} },
  inlineColorsTemplate: '',
};

/** Run a command to completion, capturing its output and exit code. */
const run = (
  command: string,
  args: string[],
  cwd: string,
  env?: Record<string, string | undefined>
) =>
  new Promise<{ exitCode: number; stdout: string; stderr: string }>(
    (resolve, reject) => {
      const child = spawn(command, args, env ? { cwd, env } : { cwd });
      let stdout = '';
      let stderr = '';
      child.stdout.on('data', (chunk: Buffer) => {
        stdout += chunk.toString();
      });
      child.stderr.on('data', (chunk: Buffer) => {
        stderr += chunk.toString();
      });
      child.on('error', reject);
      child.on('exit', (code) => {
        resolve({ exitCode: code ?? 1, stderr, stdout });
      });
    }
  );

/** Build a Style's Registry into the docs app's static output, discarding stale output. */
const buildRegistry = async (style: string) => {
  await rm(join(webDir, 'public/r', style), {
    force: true,
    recursive: true,
  });

  return run(
    shadcn,
    ['build', `registry/${style}/registry.json`, '-o', `public/r/${style}`],
    webDir
  );
};

/**
 * Serve the interop surface over local HTTP the way production will: the preset
 * route handler and the built Registry as static files. It also stands in for
 * shadcn's own host, which a stock CLI reaches for its style list and Base color
 * data whatever the Namespace says.
 */
const serveInterop = () =>
  Bun.serve({
    async fetch(request) {
      const { pathname } = new URL(request.url);

      if (pathname.startsWith('/init/')) {
        const [, , style, baseColor] = pathname.split('/');
        return GET(request, { params: Promise.resolve({ baseColor, style }) });
      }

      if (pathname === '/r/styles/index.json') {
        return Response.json([]);
      }

      if (pathname.startsWith('/r/colors/')) {
        return Response.json(baseColorDoc);
      }

      const asset = join(webDir, 'public', pathname);
      if (!existsSync(asset)) {
        return new Response('Not found', { status: 404 });
      }

      return new Response(await readFile(asset));
    },
    hostname: '127.0.0.1',
    port: 0,
  });

/** The declarations a CSS file holds inside a selector's block. */
const declarations = (css: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
};

/**
 * The declarations a color scheme resolves its radius from. `.dark` inherits
 * every Token it does not restate, so an override wins only by being present.
 */
const radiusDeclarations = (css: string, scheme: 'dark' | 'light') => {
  const dark = declarations(css, '.dark');

  return scheme === 'dark' && dark.includes('--radius:')
    ? dark
    : declarations(css, ':root');
};

test('date-picker is documented as a composition with no registry item', async () => {
  const docsDir = join(webDir, 'content/docs/zen');
  const catalog = await readCatalog('zen');
  const meta: { pages: string[] } = JSON.parse(
    await readFile(join(docsDir, 'meta.json'), 'utf8')
  );
  const page = await readFile(join(docsDir, 'date-picker.mdx'), 'utf8');

  expect(meta.pages, 'date-picker is not in the docs menu').toContain(
    'date-picker'
  );
  expect(
    catalog.map((item) => item.name),
    'date-picker is a composition and must not ship as a registry item'
  ).not.toContain('date-picker');
  expect(PENDING_COMPONENTS, 'date-picker is documented').not.toContain(
    'date-picker'
  );
  expect(page, 'the page has no live preview').toContain(
    '<DatePickerPreview />'
  );
  expect(page, 'the page has no usage snippet').toContain('## Usage');
  expect(page, 'the snippet does not compose calendar').toContain(
    "from '@/components/ui/calendar'"
  );
  expect(page, 'the snippet does not compose popover').toContain(
    "from '@/components/ui/popover'"
  );
});

test('installing a preset and every item of every Style leaves Consumer projects that typecheck', async () => {
  const server = serveInterop();
  const origin = `http://127.0.0.1:${server.port}`;
  const cliEnv = { ...process.env, REGISTRY_URL: `${origin}/r` };

  try {
    for (const style of STYLES) {
      const docsDir = join(webDir, 'content/docs', style.name);

      // biome-ignore lint/performance/noAwaitInLoops: each Style owns a scratch project and a CLI run
      const build = await buildRegistry(style.name);
      expect(build.exitCode, build.stdout + build.stderr).toBe(0);

      const scratch = await mkdtemp(
        join(tmpdir(), `kosori-consumer-${style.name}-`)
      );

      try {
        await cp(fixtureDir, scratch, { recursive: true });
        await symlink(
          join(webDir, 'node_modules'),
          join(scratch, 'node_modules')
        );

        // ADR-0003: an install writes only the component directory, the CSS
        // entry and the dependency manifests. Record the tree before it runs.
        const before = await readTree(scratch);

        const init = await run(
          shadcn,
          [
            'init',
            `${origin}/init/${style.name}/neutral`,
            '-f',
            '-s',
            '--no-reinstall',
          ],
          scratch,
          cliEnv
        );
        expect(init.exitCode, init.stdout + init.stderr).toBe(0);

        const config = JSON.parse(
          await readFile(join(scratch, 'components.json'), 'utf8')
        );
        expect(config.style).toBe(style.name);
        expect(config.tailwind.baseColor).toBe('neutral');
        expect(config.registries['@kosori']).toBe(productionNamespace);

        // The preset writes the production Namespace; pointing that same handle
        // at the harness afterwards keeps the shipped URL under assertion while
        // the locally-run `add` never has to resolve production.
        config.registries['@kosori'] = `${origin}/r/{style}/{name}.json`;
        await writeFile(
          join(scratch, 'components.json'),
          `${JSON.stringify(config, null, 2)}\n`
        );

        const items = await readCatalog(style.name);
        const components = items.filter((item) => item.type === 'registry:ui');
        const documented = components.filter(
          (component) => !isInternalItem(component.name)
        );
        const catalogComponentNames = components.map((item) => item.name);

        for (const pending of PENDING_COMPONENTS) {
          expect(
            catalogComponentNames,
            `${pending} is Pending and also in the catalog`
          ).not.toContain(pending);
        }

        // Coverage comes from the catalog alone: every documented component
        // must ship an Example, a page and a menu entry, so a forgotten edit
        // fails here instead of disappearing silently. Internal items are
        // exempt because a Consumer never installs them directly.
        const examples = items.filter(
          (item) => item.type === 'registry:example'
        );
        const meta: { pages: string[] } = JSON.parse(
          await readFile(join(docsDir, 'meta.json'), 'utf8')
        );

        // Internal items install as dependencies, but documentation never
        // claims them: no Example, page or menu entry of their own.
        for (const internal of INTERNAL_ITEMS) {
          expect(
            PENDING_COMPONENTS as readonly string[],
            `${internal.name} is Internal (${internal.reason}) and also Pending`
          ).not.toContain(internal.name);
          expect(
            examples.some(
              (example) => example.name === `${internal.name}-example`
            ),
            `${internal.name} is Internal (${internal.reason}) and has an Example`
          ).toBe(false);
          expect(
            existsSync(join(docsDir, `${internal.name}.mdx`)),
            `${internal.name} is Internal (${internal.reason}) and has a documentation page`
          ).toBe(false);
          expect(
            meta.pages,
            `${internal.name} is Internal (${internal.reason}) and in the docs menu`
          ).not.toContain(internal.name);
        }

        expect(
          meta.pages,
          'the components status page is not in the menu'
        ).toContain('components');
        expect(
          existsSync(join(docsDir, 'components.mdx')),
          'the components status page has no page'
        ).toBe(true);

        for (const component of documented) {
          expect(
            examples.some(
              (example) => example.name === `${component.name}-example`
            ),
            `${component.name} has no Example`
          ).toBe(true);
          expect(
            existsSync(join(docsDir, `${component.name}.mdx`)),
            `${component.name} has no documentation page`
          ).toBe(true);
          expect(
            meta.pages,
            `${component.name} is not in the docs menu`
          ).toContain(component.name);
        }

        // Pending names are inert: they must never be a menu entry of their own.
        for (const pending of PENDING_COMPONENTS) {
          expect(
            meta.pages,
            `${pending} is Pending and in the docs menu`
          ).not.toContain(pending);
        }

        const docsPages = (await readdir(docsDir))
          .filter((file) => file.endsWith('.mdx'))
          .map((file) => file.replace(/\.mdx$/, ''));
        const knownPages = new Set([
          ...documented.map((component) => component.name),
          ...NON_COMPONENT_PAGES,
        ]);
        expect(
          docsPages.filter((page) => !knownPages.has(page)),
          'a documentation page belongs to no catalog component'
        ).toEqual([]);

        // Install every item the catalog serves, so coverage cannot shrink as
        // the catalog grows: a new item is exercised without touching this test.
        const add = await run(
          shadcn,
          ['add', ...items.map((item) => `@kosori/${item.name}`), '-y', '-s'],
          scratch,
          cliEnv
        );
        expect(add.exitCode, add.stdout + add.stderr).toBe(0);

        // The snippets a Consumer arrives with must compile against the Port.
        // kaze serves only a subset of the catalog, so its own snippet is out
        // of scope until the Style is complete.
        if (style.name === 'zen') {
          await writeFile(
            join(scratch, 'components/ui-shadcn-aliases.tsx'),
            SHADCN_ALIAS_SNIPPET
          );
        }

        // Every catalog item installs. The file an install writes and the file
        // the docs read must be the same bytes for every item, so a transform
        // that would rewrite a source file fails the suite rather than reaching
        // a Consumer.
        await Promise.all(
          items.map(async (item) => {
            const installed = installedPath(item, scratch);
            expect(existsSync(installed), item.name).toBe(true);
            expect(await readFile(installed, 'utf8'), item.name).toBe(
              await readFile(join(webDir, item.files[0].path), 'utf8')
            );
          })
        );

        // ADR-0003: nothing outside the component directory, the CSS entry and
        // the dependency manifests may change, so a write into `lib/` or a
        // stray manifest fails rather than passing unnoticed.
        const after = await readTree(scratch);
        const outsideSurface = [...new Set([...before.keys(), ...after.keys()])]
          .filter((path) => before.get(path) !== after.get(path))
          .filter((path) => !isInstallSurface(path));
        expect(
          outsideSurface,
          'install wrote outside the component directory, CSS entry and manifests'
        ).toEqual([]);

        const css = await readFile(join(scratch, 'app/globals.css'), 'utf8');
        expect(declarations(css, ':root')).toContain(
          '--background: oklch(1 0 0)'
        );
        expect(radiusDeclarations(css, 'light')).toContain(
          `--radius: ${styleRadius(style, 'light')}`
        );
        expect(declarations(css, '.dark')).toContain(
          '--background: oklch(0.145 0 0)'
        );
        expect(radiusDeclarations(css, 'dark')).toContain(
          `--radius: ${styleRadius(style, 'dark')}`
        );

        const typecheck = await run(
          tsc,
          ['--noEmit', '-p', 'tsconfig.json'],
          scratch
        );
        expect(typecheck.exitCode, typecheck.stdout + typecheck.stderr).toBe(0);
      } finally {
        await rm(scratch, { force: true, recursive: true });
      }
    }
  } finally {
    server.stop(true);
  }
}, 240_000);

test('every Internal item is installable under its declared type', async () => {
  const catalogs = await Promise.all(
    STYLES.map(async (style) => ({
      items: await readCatalog(style.name),
      name: style.name,
    }))
  );

  for (const internal of INTERNAL_ITEMS) {
    const served = catalogs.flatMap(({ items, name: style }) =>
      items
        .filter((item) => item.name === internal.name)
        .map((item) => ({ style, type: item.type }))
    );

    expect(
      served.length,
      `${internal.name} is Internal but no catalog serves it`
    ).toBeGreaterThan(0);

    for (const entry of served) {
      expect(entry.type, `${entry.style} serves ${internal.name}`).toBe(
        internal.type
      );
    }

    for (const { items, name: style } of catalogs) {
      expect(
        items.some((item) => item.name === `${internal.name}-example`),
        `${style} documents Internal item ${internal.name}`
      ).toBe(false);
    }
  }
});

test('init writes the semantic state Tokens for every Base color in both schemes', async () => {
  const server = serveInterop();
  const origin = `http://127.0.0.1:${server.port}`;
  const cliEnv = { ...process.env, REGISTRY_URL: `${origin}/r` };

  try {
    for (const style of STYLES) {
      for (const baseColor of Object.keys(BASE_COLORS)) {
        // biome-ignore lint/performance/noAwaitInLoops: each Base color owns a scratch project and a CLI run
        const scratch = await mkdtemp(
          join(tmpdir(), `kosori-tokens-${style.name}-${baseColor}-`)
        );

        try {
          await cp(fixtureDir, scratch, { recursive: true });
          await symlink(
            join(webDir, 'node_modules'),
            join(scratch, 'node_modules')
          );

          const init = await run(
            shadcn,
            [
              'init',
              `${origin}/init/${style.name}/${baseColor}`,
              '-f',
              '-s',
              '--no-reinstall',
            ],
            scratch,
            cliEnv
          );
          expect(init.exitCode, init.stdout + init.stderr).toBe(0);

          const css = await readFile(join(scratch, 'app/globals.css'), 'utf8');

          for (const [token, value] of Object.entries(STATE_TOKENS.light)) {
            expect(
              declarations(css, ':root'),
              `${style.name}/${baseColor} light ${token}`
            ).toContain(`--${token}: ${value}`);
          }
          for (const [token, value] of Object.entries(STATE_TOKENS.dark)) {
            expect(
              declarations(css, '.dark'),
              `${style.name}/${baseColor} dark ${token}`
            ).toContain(`--${token}: ${value}`);
          }
        } finally {
          await rm(scratch, { force: true, recursive: true });
        }
      }
    }
  } finally {
    server.stop(true);
  }
}, 240_000);
