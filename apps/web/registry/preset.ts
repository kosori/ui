import type { RegistryBaseItem, RegistryItem } from 'shadcn/schema';
import { BASE_COLORS, type BaseColor } from './base-colors';

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
 * are supplied by the composer rather than carried here.
 */
export type Style<Name extends string = string> = {
  css: NonNullable<RegistryBaseItem['css']>;
  config: StyleConfig;
  dependencies: string[];
  devDependencies: string[];
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
  name: 'kaze',
  tokens: { dark: { radius: '1rem' }, light: { radius: '1rem' } },
});

/** Every Style the Registry publishes. */
export const STYLES = [zen, kaze] as const;

export type StyleName = (typeof STYLES)[number]['name'];

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
        '--font-heading': 'var(--font-sans)',
        '--font-mono': MONO_STACK,
        '--font-sans': SANS_STACK,
      },
    },
    dependencies: style.dependencies,
    devDependencies: style.devDependencies,
    extends: 'none',
    name: style.name,
    type: 'registry:base',
  };
};
