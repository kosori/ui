import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  type ControllableOpenOptions,
  motionTokens,
  useControllableOpen,
} from '../registry/zen/lib/motion';

const webDir = join(import.meta.dirname, '..');
const readMotionPage = () =>
  readFile(join(webDir, 'content/docs/zen/motion.mdx'), 'utf8');

/**
 * The body rows of the first Markdown table under a heading, split into cells
 * without the leading and trailing pipe.
 */
const tableAfter = (page: string, heading: string): string[][] => {
  const section = page.split(`## ${heading}`)[1]?.split('\n## ')[0] ?? '';

  return section
    .split('\n')
    .filter((line) => line.startsWith('|') && !line.startsWith('| ---'))
    .slice(1)
    .map((line) =>
      line
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim())
    );
};

const withoutTicks = (cell: string) => cell.replaceAll('`', '');

/** The surfaces the Motion page must list as Motion-driven. */
const MOTION_SURFACES = [
  'Accordion and Collapsible height',
  'Button and Toggle press',
  'Dialog, Sheet, Alert Dialog',
  'Popover, menus, Command, Select, Combobox, Autocomplete, Navigation Menu',
  'Slider thumb',
  'Switch thumb and Checkbox mark',
  'Tabs highlight',
  'Tooltip and Preview Card',
];

test('the Motion page names a shipped preset for every animated surface', async () => {
  const page = await readMotionPage();
  const rows = tableAfter(page, 'What animates').filter(
    ([, engine]) => engine === 'Motion'
  );
  const presets = new Set(Object.keys(motionTokens.spring));

  expect(
    rows.map(([surface]) => surface).sort(),
    'every Motion surface is documented'
  ).toEqual([...MOTION_SURFACES].sort());

  for (const [surface, , preset] of rows) {
    expect(
      presets.has(withoutTicks(preset)),
      `${surface} documents a shipped preset`
    ).toBe(true);
  }
});

type ProbeProps = ControllableOpenOptions;

const Probe = (props: ProbeProps) =>
  createElement('span', null, String(useControllableOpen(props).open));

const resolvedOpen = (props: ProbeProps) =>
  renderToStaticMarkup(createElement(Probe, props));

test('a popup open state resolves controlled and uncontrolled props', () => {
  expect(resolvedOpen({}), 'an unset popup starts closed').toBe(
    '<span>false</span>'
  );
  expect(
    resolvedOpen({ defaultOpen: true }),
    'defaultOpen seeds the state'
  ).toBe('<span>true</span>');
  expect(resolvedOpen({ open: true }), 'a controlled open wins').toBe(
    '<span>true</span>'
  );
  expect(
    resolvedOpen({ defaultOpen: true, open: false }),
    'a controlled open overrides the uncontrolled default'
  ).toBe('<span>false</span>');
});

test('the Motion page lists every preset with the values that ship', async () => {
  const page = await readMotionPage();
  const rows = tableAfter(page, 'Presets').map(([name, values]) => ({
    name: withoutTicks(name),
    values: withoutTicks(values),
  }));

  expect(
    rows.map(({ name }) => name).sort(),
    'the page lists exactly the shipped presets'
  ).toEqual(Object.keys(motionTokens.spring).sort());

  for (const { name, values } of rows) {
    const preset = motionTokens.spring[
      name as keyof typeof motionTokens.spring
    ] as Record<string, number>;

    for (const [key, value] of Object.entries(preset)) {
      expect(values, `${name} documents ${key}: ${value}`).toContain(
        `${key}: ${value}`
      );
    }
  }

  expect(page, 'the page documents the press scale').toContain(
    `\`motionTokens.pressScale\` defaults to \`${motionTokens.pressScale}\``
  );
});

test('the Motion page documents the CSS timing Tokens that ship', async () => {
  const page = await readMotionPage();
  const registry = JSON.parse(
    await readFile(join(webDir, 'registry/zen/registry.json'), 'utf8')
  ) as {
    items: { cssVars?: Record<string, Record<string, string>>; name: string }[];
  };
  const stylesheet = await readFile(join(webDir, 'app/tokens.css'), 'utf8');
  const declared = new Map<string, string>(
    [...stylesheet.matchAll(/--([a-z-]+):\s*([^;]+);/g)].map((match) => [
      `--${match[1]}`,
      match[2] ?? '',
    ])
  );
  const drawer = registry.items.find((item) => item.name === 'drawer');

  for (const [token, value] of Object.entries(drawer?.cssVars?.light ?? {})) {
    declared.set(`--${token}`, value);
  }

  const rows = tableAfter(page, 'Easing and duration');

  expect(rows.length, 'the page documents a timing table').toBeGreaterThan(0);

  for (const [token, value] of rows.map(([name, current]) => [
    withoutTicks(name),
    withoutTicks(current),
  ])) {
    expect(declared.has(token), `${token} ships in the timing scale`).toBe(
      true
    );
    expect(declared.get(token), `${token} is documented as it ships`).toBe(
      value
    );
  }
});
