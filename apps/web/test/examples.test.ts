import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseExports } from '../lib/registry/compatibility';
import {
  EXAMPLE_OVERRIDES,
  type ExampleOverride,
} from './fixtures/example-overrides';

const examplesDir = join(import.meta.dirname, '../registry/zen/examples');
const uiDir = join(import.meta.dirname, '../registry/zen/ui');

/** A prop whose value decides whether an Example shows the shipped design. */
type PropRule = {
  component: string;
  expected: string;
  prop: string;
};

/** A class fragment that retunes a shipped default rather than composing it. */
type ClassRule = {
  component: string;
  fragment: string;
};

type Violation = ExampleOverride & {
  message: string;
};

/**
 * The props that decide a component's shipped design. An Example may pass one
 * only when its value matches the component's default, or when the override is
 * listed in the allowlist.
 */
const PROP_RULES: readonly PropRule[] = [
  { component: 'AlertDialogFooter', expected: 'default', prop: 'variant' },
  { component: 'Button', expected: 'button', prop: 'type' },
  { component: 'DialogFooter', expected: 'default', prop: 'variant' },
  { component: 'DialogPopup', expected: 'true', prop: 'showCloseButton' },
  { component: 'DrawerFooter', expected: 'default', prop: 'variant' },
  { component: 'DrawerPopup', expected: 'false', prop: 'showBar' },
  { component: 'DrawerPopup', expected: 'false', prop: 'showCloseButton' },
  { component: 'SheetFooter', expected: 'default', prop: 'variant' },
  { component: 'SheetPopup', expected: 'true', prop: 'showCloseButton' },
  { component: 'Sidebar', expected: 'offcanvas', prop: 'collapsible' },
  { component: 'SidebarProvider', expected: 'true', prop: 'defaultOpen' },
];

/** Class fragments no Example may add to a component's shipped className. */
const CLASS_RULES: readonly ClassRule[] = [
  { component: 'DrawerFooter', fragment: 'justify-center' },
  { component: 'DrawerHeader', fragment: 'text-center' },
  { component: 'FieldLabel', fragment: 'font-medium' },
  { component: 'PopoverTitle', fragment: 'text-base' },
  { component: 'Switch', fragment: '--thumb-size' },
];

/** The Tailwind palette families an Example must not name directly. */
const PALETTE_FAMILIES = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

/** The state Token a palette family already names, when it has one. */
const PALETTE_STATE_TOKENS: Record<string, string | undefined> = {
  amber: 'warning',
  blue: 'info',
  emerald: 'success',
  red: 'destructive',
};

const PALETTE_PATTERN = new RegExp(
  `\\b(?:bg|text|border|ring|fill|stroke|from|via|to)-(${PALETTE_FAMILIES.join('|')})-\\d{2,3}(?:/\\d+)?\\b`,
  'g'
);

type JsxTag = {
  name: string;
  props: Map<string, string>;
};

/** Read the attributes on a JSX opening tag, ignoring expression contents. */
const readProps = (body: string): Map<string, string> => {
  const props = new Map<string, string>();
  let cursor = 0;

  while (cursor < body.length) {
    if (/\s/.test(body[cursor]) || body[cursor] === '/') {
      cursor += 1;
      continue;
    }

    const nameStart = cursor;
    while (cursor < body.length && /[\w:-]/.test(body[cursor])) {
      cursor += 1;
    }

    const name = body.slice(nameStart, cursor);
    if (!name) {
      cursor += 1;
      continue;
    }

    while (/\s/.test(body[cursor])) {
      cursor += 1;
    }

    if (body[cursor] !== '=') {
      props.set(name, 'true');
      continue;
    }

    cursor += 1;
    while (/\s/.test(body[cursor])) {
      cursor += 1;
    }

    const quote = body[cursor];
    if (quote === '"' || quote === "'") {
      cursor += 1;
      const valueStart = cursor;
      while (cursor < body.length && body[cursor] !== quote) {
        cursor += 1;
      }
      props.set(name, body.slice(valueStart, cursor));
      cursor += 1;
      continue;
    }

    if (quote === '{') {
      cursor += 1;
      const valueStart = cursor;
      let depth = 1;
      let innerQuote: string | null = null;

      while (cursor < body.length && depth > 0) {
        const char = body[cursor];

        if (innerQuote) {
          if (char === innerQuote) {
            innerQuote = null;
          }
        } else if (char === '"' || char === "'" || char === '`') {
          innerQuote = char;
        } else if (char === '{') {
          depth += 1;
        } else if (char === '}') {
          depth -= 1;
          if (depth === 0) {
            break;
          }
        }

        cursor += 1;
      }

      props.set(name, body.slice(valueStart, cursor).trim());
      cursor += 1;
      continue;
    }

    const valueStart = cursor;
    while (cursor < body.length && !/\s/.test(body[cursor])) {
      cursor += 1;
    }
    props.set(name, body.slice(valueStart, cursor));
  }

  return props;
};

/** Read the JSX opening tags in an Example source. */
const readTags = (source: string): JsxTag[] => {
  const tags: JsxTag[] = [];
  let cursor = 0;

  while (cursor < source.length) {
    const name = /^<([A-Z][\w.]*)/.exec(source.slice(cursor));
    if (!name) {
      cursor += 1;
      continue;
    }

    const bodyStart = cursor + name[0].length;
    let quote: string | null = null;
    let braces = 0;
    let end = bodyStart;

    while (end < source.length) {
      const char = source[end];

      if (quote) {
        if (char === quote) {
          quote = null;
        }
      } else if (char === '"' || char === "'" || char === '`') {
        quote = char;
      } else if (char === '{') {
        braces += 1;
      } else if (char === '}') {
        braces -= 1;
      } else if (char === '>' && braces === 0) {
        break;
      }

      end += 1;
    }

    tags.push({
      name: name[1],
      props: readProps(source.slice(bodyStart, end)),
    });
    cursor = end + 1;
  }

  return tags;
};

/** The index of the delimiter that closes `open`, ignoring nested strings. */
const matchingDelimiter = (
  source: string,
  open: number,
  openChar: string,
  closeChar: string
) => {
  let depth = 0;
  let quote: string | null = null;

  for (let cursor = open; cursor < source.length; cursor += 1) {
    const char = source[cursor];

    if (quote) {
      if (char === quote && source[cursor - 1] !== '\\') {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
    } else if (char === openChar) {
      depth += 1;
    } else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return cursor;
      }
    }
  }

  return -1;
};

/** The variant and size defaults each exported component ships. */
const readComponentDefaults = async () => {
  const defaults = new Map<string, Map<string, string>>();
  const files = (await readdir(uiDir)).filter((file) => file.endsWith('.tsx'));
  const sources = await Promise.all(
    files.map(async (file) => ({
      file,
      source: await readFile(join(uiDir, file), 'utf8'),
    }))
  );

  for (const { source } of sources) {
    const cvaDefaults = new Map<string, Map<string, string>>();

    for (const match of source.matchAll(
      /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*cva\s*\(/g
    )) {
      const [, name] = match;
      const open = (match.index ?? 0) + match[0].length - 1;
      const close = matchingDelimiter(source, open, '(', ')');
      if (!name || close === -1) {
        continue;
      }

      const block = /defaultVariants\s*:\s*\{([^}]*)\}/.exec(
        source.slice(open, close)
      );
      const values = new Map<string, string>();

      for (const pair of block?.[1]?.matchAll(
        /([A-Za-z0-9_$]+)\s*:\s*['"]([^'"]+)['"]/g
      ) ?? []) {
        const [, prop, value] = pair;
        if (prop && value && (prop === 'variant' || prop === 'size')) {
          values.set(prop, value);
        }
      }

      if (values.size > 0) {
        cvaDefaults.set(name, values);
      }
    }

    for (const match of source.matchAll(
      /export\s+function\s+([A-Za-z0-9_$]+)\s*\(/g
    )) {
      const [, name] = match;
      const open = (match.index ?? 0) + match[0].length - 1;
      const close = matchingDelimiter(source, open, '(', ')');
      if (!name || close === -1) {
        continue;
      }

      const bodyOpen = source.indexOf('{', close);
      if (bodyOpen === -1) {
        continue;
      }

      const bodyClose = matchingDelimiter(source, bodyOpen, '{', '}');
      if (bodyClose === -1) {
        continue;
      }

      const params = source.slice(open + 1, close);
      const body = source.slice(bodyOpen, bodyClose);
      const values = new Map<string, string>();

      for (const pair of params.matchAll(
        /\b(variant|size)\s*=\s*['"]([^'"]+)['"]/g
      )) {
        const [, prop, value] = pair;
        if (prop && value) {
          values.set(prop, value);
        }
      }

      for (const [cvaName, cvaValues] of cvaDefaults) {
        if (!new RegExp(`\\b${cvaName}\\s*\\(`).test(body)) {
          continue;
        }

        for (const [prop, value] of cvaValues) {
          if (!values.has(prop)) {
            values.set(prop, value);
          }
        }
      }

      if (values.size > 0) {
        defaults.set(name, values);
      }
    }

    for (const [exported, local] of parseExports(source).aliases) {
      const localDefaults = defaults.get(local);
      if (localDefaults && !defaults.has(exported)) {
        defaults.set(exported, localDefaults);
      }
    }
  }

  return defaults;
};

/** One override of a tracked prop, or null when the tag uses the default. */
const propViolation = (
  example: string,
  tag: JsxTag,
  rule: PropRule
): Violation | null => {
  if (tag.name !== rule.component) {
    return null;
  }

  const actual = tag.props.get(rule.prop);
  if (actual === undefined || actual === rule.expected) {
    return null;
  }

  return {
    example,
    message: `${example}: ${rule.component}.${rule.prop} is ${actual}, expected ${rule.expected}`,
    target: `${rule.component}.${rule.prop}`,
    value: actual,
  };
};

/** Every way an Example departs from a component's shipped default. */
const findViolations = async (): Promise<Violation[]> => {
  const files = (await readdir(examplesDir)).filter((file) =>
    file.endsWith('.tsx')
  );
  const sources = await Promise.all(
    files.map(async (example) => ({
      example,
      source: await readFile(join(examplesDir, example), 'utf8'),
    }))
  );
  const componentDefaults = await readComponentDefaults();
  const violations: Violation[] = [];

  for (const { example, source } of sources) {
    for (const tag of readTags(source)) {
      for (const rule of PROP_RULES) {
        const violation = propViolation(example, tag, rule);
        if (violation) {
          violations.push(violation);
        }
      }

      for (const [prop, expected] of componentDefaults.get(tag.name) ?? []) {
        const actual = tag.props.get(prop);
        if (actual === undefined || actual === expected) {
          continue;
        }

        violations.push({
          example,
          message: `${example}: ${tag.name}.${prop} is ${actual}, expected ${expected}`,
          target: `${tag.name}.${prop}`,
          value: actual,
        });
      }

      for (const rule of CLASS_RULES) {
        if (tag.name !== rule.component) {
          continue;
        }

        const className = tag.props.get('className') ?? '';
        if (!className.includes(rule.fragment)) {
          continue;
        }

        violations.push({
          example,
          message: `${example}: ${rule.component}.className retunes ${rule.fragment}`,
          target: `${rule.component}.className`,
          value: rule.fragment,
        });
      }
    }

    for (const match of source.matchAll(PALETTE_PATTERN)) {
      const family = match[1] ?? '';
      const token = PALETTE_STATE_TOKENS[family];

      violations.push({
        example,
        message: `${example}: ${match[0]} is a raw palette colour; use ${
          token ? `a ${token} Token` : 'a Token'
        }`,
        target: 'className',
        value: match[0],
      });
    }
  }

  return violations;
};

/** The stable identity an allowlist entry and a found violation share. */
const violationKey = ({ example, target, value }: ExampleOverride) =>
  `${example}\0${target}\0${value}`;

test('every Example override is on the allowlist', async () => {
  const allowed = new Set(EXAMPLE_OVERRIDES.map(violationKey));
  const unexplained = (await findViolations()).filter(
    (violation) => !allowed.has(violationKey(violation))
  );

  expect(
    unexplained.map(({ message }) => message),
    'an Example overrides the design its component ships'
  ).toEqual([]);
});

test('the allowlist explains only overrides that exist', async () => {
  const found = new Set((await findViolations()).map(violationKey));

  for (const entry of EXAMPLE_OVERRIDES) {
    expect(entry.reason.trim(), `${entry.example} has no reason`).not.toBe('');
    expect(
      found.has(violationKey(entry)),
      `${entry.example}: ${entry.target} is allowlisted but no longer overrides it`
    ).toBe(true);
  }
});
