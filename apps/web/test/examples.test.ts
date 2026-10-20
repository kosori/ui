import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  EXAMPLE_OVERRIDES,
  type ExampleOverride,
} from './fixtures/example-overrides';

const examplesDir = join(import.meta.dirname, '../registry/zen/examples');

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

/** Raw palette colours a state Token already names. */
const PALETTE_TOKENS = {
  amber: 'warning',
  blue: 'info',
  emerald: 'success',
  red: 'destructive',
} as const;

const PALETTE_PATTERN =
  /\b(?:bg|text|border|ring|fill|stroke|from|via|to)-(emerald|amber|red|blue)-\d{2,3}(?:\/\d+)?\b/g;

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
  const violations: Violation[] = [];

  for (const { example, source } of sources) {
    for (const tag of readTags(source)) {
      for (const rule of PROP_RULES) {
        if (tag.name !== rule.component) {
          continue;
        }

        const actual = tag.props.get(rule.prop);
        if (actual === undefined || actual === rule.expected) {
          continue;
        }

        violations.push({
          example,
          message: `${example}: ${rule.component}.${rule.prop} is ${actual}, expected ${rule.expected}`,
          target: `${rule.component}.${rule.prop}`,
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
      const token = PALETTE_TOKENS[match[1] as keyof typeof PALETTE_TOKENS];

      violations.push({
        example,
        message: `${example}: ${match[0]} is a raw palette colour; use a ${token} Token`,
        target: 'className',
        value: match[0],
      });
    }
  }

  return violations;
};

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
