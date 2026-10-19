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

type StyleConfig = NonNullable<RegistryBaseItem['config']>;

/**
 * A Style: the component source plus the Token defaults that source assumes, as
 * a `registry:base` item. `style` and `tailwind.baseColor` are per-request and so
 * are supplied by the composer rather than carried here.
 */
export type Style = {
  css: NonNullable<RegistryBaseItem['css']>;
  config: Omit<StyleConfig, 'style' | 'tailwind'>;
  dependencies: string[];
  devDependencies: string[];
  name: string;
};

/** The first Style. */
export const zen: Style = {
  config: {
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
  },
  css: {
    '@import "shadcn/tailwind.css"': {},
    '@import "tw-animate-css"': {},
    '@layer base': {
      '*': { '@apply border-border outline-ring/50': {} },
      body: { '@apply bg-background text-foreground': {} },
    },
  },
  dependencies: [
    '@base-ui/react',
    '@tabler/icons-react',
    'class-variance-authority',
    'cn',
  ],
  devDependencies: ['shadcn', 'tw-animate-css'],
  name: 'zen',
};

const styles = new Map([[zen.name, zen]]);

/** Look up a Style by the name a Consumer project's URL carries. */
export const findStyle = (name: string) => styles.get(name);

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
      dark: tokens.dark,
      light: tokens.light,
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
