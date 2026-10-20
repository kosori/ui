import type { RegistryBaseItem, RegistryItem } from 'shadcn/schema';
import { BASE_COLORS, type BaseColor, DEFAULT_BASE_COLOR } from './base-colors';

/** The Namespace a Consumer project maps to the Registry. */
export const KOSORI_NAMESPACE = '@kosori';

/**
 * The Registry URL the Namespace resolves against. `{style}` is substituted from
 * the Consumer project's config, so one Namespace serves every Style.
 */
export const KOSORI_REGISTRY_URL =
  'https://kosori.codingcodax.dev/r/{style}/{name}.json';

const SANS_STACK =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const MONO_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const FONT_THEME = {
  '--font-heading': 'var(--font-sans)',
  '--font-mono': MONO_STACK,
  '--font-sans': SANS_STACK,
} as const;

/**
 * The state Tokens coss's classes reference. Their values are identical in
 * every Base color because state colour does not depend on the palette.
 */
export const STATE_TOKEN_NAMES = [
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'info',
  'info-foreground',
  'destructive-foreground',
] as const;

export type StateTokenName = (typeof STATE_TOKEN_NAMES)[number];

/** Token keys in a Base color block that do not produce a colour utility. */
const NON_COLOR_TOKEN_KEYS = new Set(['radius']);

/**
 * Derive the `@theme inline` colour mappings a scheme's Token declarations
 * need. A mapping is what makes Tailwind compile a utility such as
 * `bg-success`; the declaration alone only names the property.
 */
export const colorThemeTokens = (tokens: Record<string, string>) =>
  Object.fromEntries(
    Object.keys(tokens)
      .filter((token) => !NON_COLOR_TOKEN_KEYS.has(token))
      .map((token) => [`--color-${token}`, `var(--${token})`])
  );

/**
 * The declarations and `@theme` mappings an item needs when its source
 * references a state Token. A partial install carries its own state colour.
 */
export const stateTokenCssVars = (tokens: readonly StateTokenName[]) => {
  const base = BASE_COLORS[DEFAULT_BASE_COLOR];

  return {
    dark: Object.fromEntries(
      tokens.map((token) => [token, base.dark[token]])
    ),
    light: Object.fromEntries(
      tokens.map((token) => [token, base.light[token]])
    ),
    theme: Object.fromEntries(
      tokens.map((token) => [`--color-${token}`, `var(--${token})`])
    ),
  };
};

type StyleConfig = Omit<
  NonNullable<RegistryBaseItem['config']>,
  'style' | 'tailwind'
>;

/** The Base color Tokens a Style overrides, per color scheme. */
type StyleTokens = {
  dark?: Record<string, string>;
  light?: Record<string, string>;
};

/**
 * A Style: the component source plus the Token defaults that source assumes, as
 * a `registry:base` item. `style` and `tailwind.baseColor` are per-request and so
 * are supplied by the composer rather than carried here. An Incomplete Style
 * declares that it serves a subset of the catalog rather than all of it.
 */
export type Style<Name extends string = string> = {
  css: NonNullable<RegistryBaseItem['css']>;
  config: StyleConfig;
  dependencies: string[];
  devDependencies: string[];
  incomplete?: true;
  name: Name;
  tokens?: StyleTokens;
};

const STYLE_CONFIG: StyleConfig = {
  aliases: {
    components: '@/components',
    hooks: '@/hooks',
    lib: '@/lib',
    ui: '@/components/ui',
    utils: '@/lib/utils',
  },
  iconLibrary: 'tabler',
  menuAccent: 'subtle',
  menuColor: 'default',
  registries: { [KOSORI_NAMESPACE]: KOSORI_REGISTRY_URL },
  rtl: false,
};

const STYLE_CSS: NonNullable<RegistryBaseItem['css']> = {
  '@import "shadcn/tailwind.css"': {},
  '@import "tw-animate-css"': {},
  '@layer base': {
    '*': { '@apply border-border outline-ring/50': {} },
    body: { '@apply bg-background text-foreground': {} },
  },
};

const STYLE_DEPENDENCIES = [
  '@base-ui/react',
  '@tabler/icons-react',
  'class-variance-authority',
  'cn',
];

const STYLE_DEV_DEPENDENCIES = ['shadcn', 'tw-animate-css'];

const defineStyle = <const Name extends string>(style: Style<Name>) => style;

/** Tight and neutral: the `base-nova` port a Consumer project starts from. */
export const zen = defineStyle({
  config: STYLE_CONFIG,
  css: STYLE_CSS,
  dependencies: STYLE_DEPENDENCIES,
  devDependencies: STYLE_DEV_DEPENDENCIES,
  name: 'zen',
});

/** Airier than `zen`: a larger radius, taller controls and softer focus. */
export const kaze = defineStyle({
  config: STYLE_CONFIG,
  css: STYLE_CSS,
  dependencies: STYLE_DEPENDENCIES,
  devDependencies: STYLE_DEV_DEPENDENCIES,
  incomplete: true,
  name: 'kaze',
  tokens: { dark: { radius: '1rem' }, light: { radius: '1rem' } },
});

/** Every Style the Registry publishes. */
export const STYLES = [zen, kaze] as const;

export type StyleName = (typeof STYLES)[number]['name'];

/**
 * The scale shadcn derives from `--radius`. It has one owner so a documentation
 * preview and a Consumer project's Theme cannot drift apart.
 */
const RADIUS_SCALE = [
  ['--radius-sm', 0.6],
  ['--radius-md', 0.8],
  ['--radius-lg', 1],
  ['--radius-xl', 1.4],
  ['--radius-2xl', 1.8],
  ['--radius-3xl', 2.2],
  ['--radius-4xl', 2.6],
] as const;

/**
 * The radius a Style resolves to in a color scheme. A scheme inherits the light
 * value when the Style does not override it, as `.dark` does in CSS.
 */
export const styleRadius = (style: Style, scheme: 'dark' | 'light') =>
  style.tokens?.[scheme]?.radius ??
  style.tokens?.light?.radius ??
  BASE_COLORS[DEFAULT_BASE_COLOR].light.radius;

/** Compose the Token block that derives the whole radius scale from one value. */
export const radiusTokens = (radius: string) =>
  Object.fromEntries([
    ['--radius', radius],
    ...RADIUS_SCALE.map(([token, factor]) => [
      token,
      `calc(${radius} * ${factor})`,
    ]),
  ]);

const styles = new Map<string, Style>(
  STYLES.map((style) => [style.name, style])
);

/** Look up a Style by the name a Consumer project's URL carries. */
export const findStyle = (name: string) => styles.get(name);

/** Narrow an arbitrary path segment to a Style the Registry publishes. */
export const isStyleName = (value: string): value is StyleName =>
  styles.has(value);

/**
 * Compose the preset document for a Style at a Base color: the `registry:base`
 * item a Consumer project's `init` installs. The Token values are baked in, so
 * the values the CLI fetches from shadcn's host are discarded.
 */
export const composeStyleItem = (
  style: Style,
  baseColor: BaseColor
): RegistryItem => {
  const tokens = BASE_COLORS[baseColor];

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    config: {
      ...style.config,
      style: style.name,
      tailwind: { baseColor },
    },
    css: style.css,
    cssVars: {
      dark: { ...tokens.dark, ...style.tokens?.dark },
      light: { ...tokens.light, ...style.tokens?.light },
      theme: {
        ...colorThemeTokens(tokens.light),
        ...FONT_THEME,
      },
    },
    dependencies: style.dependencies,
    devDependencies: style.devDependencies,
    extends: 'none',
    name: style.name,
    type: 'registry:base',
  };
};
