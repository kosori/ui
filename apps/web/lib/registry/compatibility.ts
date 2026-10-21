import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  findStyle,
  STATE_TOKEN_NAMES,
  STYLES,
  type StyleName,
} from '../../registry/preset';
import { readCatalog } from './catalog';
import { isInternalItem } from './internal';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/** An exported shadcn/ui name that resolves to another exported identifier. */
export type AliasClaim = {
  item: string;
  local: string;
  name: string;
};

/** An exported shadcn/ui name with no coss/ui counterpart to rename. */
export type SynthesizedClaim = {
  item: string;
  names: readonly string[];
};

/** The deliberate differences the compatibility page can describe. */
export type DivergenceId =
  | 'field'
  | 'icons'
  | 'input-otp'
  | 'sonner'
  | 'toast'
  | 'tokens';

/** One deliberate difference between kosori and shadcn/ui. */
export type Divergence = {
  body: string;
  code: readonly string[];
  id: DivergenceId;
  title: string;
};

/** The exports a component module publishes, including its aliases. */
export type ModuleExports = {
  aliases: ReadonlyMap<string, string>;
  names: ReadonlySet<string>;
};

/** Everything a Style's compatibility page states. */
export type CompatibilityFacts = {
  aliases: readonly AliasClaim[];
  compositions: readonly string[];
  divergences: readonly Divergence[];
  incomplete: boolean;
  notServed: readonly string[];
  pending: readonly string[];
  served: readonly string[];
  style: StyleName;
  synthesized: readonly SynthesizedClaim[];
};

/**
 * shadcn/ui names that resolve to another identifier in the same module. A Page
 * renders these rows, and a test reads each module to prove every row is real.
 */
export const ALIASES = [
  { item: 'accordion', local: 'AccordionPanel', name: 'AccordionContent' },
  {
    item: 'alert-dialog',
    local: 'AlertDialogBackdrop',
    name: 'AlertDialogOverlay',
  },
  {
    item: 'alert-dialog',
    local: 'AlertDialogPopup',
    name: 'AlertDialogContent',
  },
  { item: 'button-group', local: 'Group', name: 'ButtonGroup' },
  {
    item: 'button-group',
    local: 'GroupSeparator',
    name: 'ButtonGroupSeparator',
  },
  { item: 'button-group', local: 'GroupText', name: 'ButtonGroupText' },
  { item: 'button-group', local: 'groupVariants', name: 'buttonGroupVariants' },
  { item: 'card', local: 'CardPanel', name: 'CardContent' },
  {
    item: 'collapsible',
    local: 'CollapsiblePanel',
    name: 'CollapsibleContent',
  },
  { item: 'combobox', local: 'ComboboxGroupLabel', name: 'ComboboxLabel' },
  { item: 'combobox', local: 'ComboboxPopup', name: 'ComboboxContent' },
  {
    item: 'context-menu',
    local: 'ContextMenuGroupLabel',
    name: 'ContextMenuLabel',
  },
  {
    item: 'context-menu',
    local: 'ContextMenuPopup',
    name: 'ContextMenuContent',
  },
  {
    item: 'context-menu',
    local: 'ContextMenuSubPopup',
    name: 'ContextMenuSubContent',
  },
  { item: 'dialog', local: 'DialogBackdrop', name: 'DialogOverlay' },
  { item: 'dialog', local: 'DialogPopup', name: 'DialogContent' },
  { item: 'drawer', local: 'DrawerBackdrop', name: 'DrawerOverlay' },
  { item: 'drawer', local: 'DrawerBar', name: 'DrawerSwipeHandle' },
  { item: 'dropdown-menu', local: 'Menu', name: 'DropdownMenu' },
  {
    item: 'dropdown-menu',
    local: 'MenuCheckboxItem',
    name: 'DropdownMenuCheckboxItem',
  },
  {
    item: 'dropdown-menu',
    local: 'MenuCreateHandle',
    name: 'DropdownMenuCreateHandle',
  },
  { item: 'dropdown-menu', local: 'MenuGroup', name: 'DropdownMenuGroup' },
  { item: 'dropdown-menu', local: 'MenuGroupLabel', name: 'DropdownMenuLabel' },
  { item: 'dropdown-menu', local: 'MenuItem', name: 'DropdownMenuItem' },
  { item: 'dropdown-menu', local: 'MenuPopup', name: 'DropdownMenuContent' },
  { item: 'dropdown-menu', local: 'MenuPortal', name: 'DropdownMenuPortal' },
  {
    item: 'dropdown-menu',
    local: 'MenuRadioGroup',
    name: 'DropdownMenuRadioGroup',
  },
  {
    item: 'dropdown-menu',
    local: 'MenuRadioItem',
    name: 'DropdownMenuRadioItem',
  },
  {
    item: 'dropdown-menu',
    local: 'MenuSeparator',
    name: 'DropdownMenuSeparator',
  },
  {
    item: 'dropdown-menu',
    local: 'MenuShortcut',
    name: 'DropdownMenuShortcut',
  },
  { item: 'dropdown-menu', local: 'MenuSub', name: 'DropdownMenuSub' },
  {
    item: 'dropdown-menu',
    local: 'MenuSubPopup',
    name: 'DropdownMenuSubContent',
  },
  {
    item: 'dropdown-menu',
    local: 'MenuSubTrigger',
    name: 'DropdownMenuSubTrigger',
  },
  { item: 'dropdown-menu', local: 'MenuTrigger', name: 'DropdownMenuTrigger' },
  { item: 'hover-card', local: 'PreviewCard', name: 'HoverCard' },
  { item: 'hover-card', local: 'PreviewCardPopup', name: 'HoverCardContent' },
  { item: 'hover-card', local: 'PreviewCardTrigger', name: 'HoverCardTrigger' },
  { item: 'popover', local: 'PopoverPopup', name: 'PopoverContent' },
  { item: 'radio-group', local: 'Radio', name: 'RadioGroupItem' },
  { item: 'select', local: 'SelectPopup', name: 'SelectContent' },
  { item: 'sheet', local: 'SheetBackdrop', name: 'SheetOverlay' },
  { item: 'sheet', local: 'SheetPopup', name: 'SheetContent' },
  { item: 'tabs', local: 'TabsPanel', name: 'TabsContent' },
  { item: 'tabs', local: 'TabsTab', name: 'TabsTrigger' },
  { item: 'tooltip', local: 'TooltipPopup', name: 'TooltipContent' },
] as const satisfies readonly AliasClaim[];

/**
 * shadcn/ui exports kosori synthesizes because coss/ui has no equivalent to
 * rename. A test reads every named module to prove the export exists.
 */
export const SYNTHESIZED_EXPORTS = [
  {
    item: 'alert-dialog',
    names: ['AlertDialogAction', 'AlertDialogCancel', 'AlertDialogMedia'],
  },
  { item: 'avatar', names: ['AvatarBadge'] },
  { item: 'calendar', names: ['CalendarDayButton'] },
  { item: 'input-group', names: ['InputGroupButton'] },
  { item: 'popover', names: ['PopoverHeader'] },
  {
    item: 'select',
    names: ['SelectScrollDownButton', 'SelectScrollUpButton'],
  },
  { item: 'tabs', names: ['tabsListVariants'] },
] as const satisfies readonly SynthesizedClaim[];

/** The Field parts that keep their shadcn/ui name in every Style. */
export const FIELD_COMPATIBILITY = {
  kosoriOnly: [
    'FieldControl',
    'FieldItem',
    'FieldValidity',
    'Fieldset',
    'FieldsetLegend',
  ],
  shadcnOnly: [
    'FieldContent',
    'FieldGroup',
    'FieldLegend',
    'FieldSeparator',
    'FieldSet',
    'FieldTitle',
  ],
  shared: ['Field', 'FieldDescription', 'FieldError', 'FieldLabel'],
} as const;

/** The InputOTP adapter's slot API and the source fact that makes it an adapter. */
export const INPUT_OTP_ADAPTER = {
  exports: ['InputOTP', 'InputOTPGroup', 'InputOTPSeparator', 'InputOTPSlot'],
} as const;

/** The shadcn/ui toast surface kosori exports on top of Base UI's manager. */
export const TOAST_SURFACE = {
  base: '@base-ui/react/toast',
  exports: ['Toaster', 'createToastManager', 'toast', 'useToastManager'],
} as const;

/** The icon library substitution every Style makes. */
export const ICON_SUBSTITUTION = {
  iconLibrary: 'tabler',
  package: '@tabler/icons-react',
  upstream: 'lucide-react',
} as const;

const FIELD_DIVERGENCE: Divergence = {
  body: 'Field is the one semantic incompatibility. shadcn/ui composes a group, content, title, set and separator; kosori wraps Base UI Field and Fieldset primitives instead. The shared names keep their meaning, but the composition differs, so Field is not aliased to the shadcn/ui API.',
  code: [...FIELD_COMPATIBILITY.shadcnOnly, ...FIELD_COMPATIBILITY.kosoriOnly],
  id: 'field',
  title: 'Field is not an alias',
};

const INPUT_OTP_DIVERGENCE: Divergence = {
  body: 'InputOTP is an adapter, not an alias. The shadcn/ui slot names are preserved, but each slot takes an index and Base UI derives segment order from document position, so slots must be rendered in index order.',
  code: INPUT_OTP_ADAPTER.exports,
  id: 'input-otp',
  title: 'InputOTP is an adapter',
};

const TOAST_DIVERGENCE: Divergence = {
  body: 'The toast surface is an adapter over the Base UI toast manager, not Sonner. Mount Toaster once and call toast.add; useToastManager and createToastManager expose the manager to custom compositions.',
  code: TOAST_SURFACE.exports,
  id: 'toast',
  title: 'Toast is a Base UI surface',
};

/** Explain sonner using the toast surface the Style actually serves. */
const sonnerDivergence = (
  style: StyleName,
  served: ReadonlySet<string>
): Divergence => ({
  body: served.has('toast')
    ? `sonner is not shipped and is not Pending. ${style} serves toast instead.`
    : `sonner is not shipped and is not Pending. ${style} serves no toast surface.`,
  code: ['sonner', '@kosori/toast'],
  id: 'sonner',
  title: 'sonner is absent',
});

const ICON_DIVERGENCE: Divergence = {
  body: 'Icons come from Tabler, not Lucide. A pasted shadcn/ui snippet that imports Lucide icons needs its icon imports changed; component names and props do not change.',
  code: [ICON_SUBSTITUTION.package, ICON_SUBSTITUTION.upstream],
  id: 'icons',
  title: 'Tabler icons replace Lucide',
};

const TOKEN_DIVERGENCE: Divergence = {
  body: 'kosori adds seven state Tokens to every Base color because coss/ui class strings reference them and shadcn/ui has no equivalent. The values are identical across Base colors, so success, warning and info mean the same thing in every palette.',
  code: STATE_TOKEN_NAMES,
  id: 'tokens',
  title: 'State Tokens are a kosori addition',
};

const DECLARATION_PATTERN =
  /export\s+(?:async\s+)?(?:function|const|class|type|interface)\s+([A-Za-z0-9_$]+)/g;

const EXPORT_LIST_PATTERN = /export\s*\{([^}]*)\}/g;

/** Parse the names and aliases a TypeScript module exports. */
export const parseExports = (source: string): ModuleExports => {
  const aliases = new Map<string, string>();
  const names = new Set<string>();

  for (const match of source.matchAll(DECLARATION_PATTERN)) {
    const [, name] = match;

    if (name) {
      names.add(name);
    }
  }

  for (const match of source.matchAll(EXPORT_LIST_PATTERN)) {
    for (const segment of (match[1] ?? '').split(',')) {
      const [local, exported] = segment.trim().split(/\s+as\s+/);

      if (!local) {
        continue;
      }

      const name = exported ?? local;
      names.add(name);

      if (exported && exported !== local) {
        aliases.set(name, local);
      }
    }
  }

  return { aliases, names };
};

/** Read a Style's source for an item, wherever that Style keeps it. */
export const readStyleSource = (style: string, item: string) => {
  const path = [
    join(REGISTRY_DIR, style, 'ui', `${item}.tsx`),
    join(REGISTRY_DIR, style, `${item}.tsx`),
  ].find((candidate) => existsSync(candidate));

  if (!path) {
    throw new Error(`${style} has no source for ${item}`);
  }

  return readFile(path, 'utf8');
};

/** Parse the exports a Style's source for an item publishes. */
export const readStyleExports = async (
  style: string,
  item: string
): Promise<ModuleExports> => parseExports(await readStyleSource(style, item));

/** The documented component names a Style's catalog serves. */
export const readServedComponentNames = async (style: string) => {
  const catalog = await readCatalog(style);

  return catalog
    .filter((item) => item.type === 'registry:ui' && !isInternalItem(item.name))
    .map((item) => item.name)
    .sort();
};

/** The documented names a complete Style serves that this Style does not. */
const readUnservedNames = async (style: StyleName, served: Set<string>) => {
  const complete = STYLES.filter(
    ({ incomplete, name }) => !incomplete && name !== style
  );
  const catalogs = await Promise.all(
    complete.map(({ name }) => readServedComponentNames(name))
  );

  return [...new Set(catalogs.flat())]
    .filter((name) => !served.has(name))
    .sort();
};

/** Collect the facts a Style's compatibility page renders. */
export const getCompatibilityFacts = async (
  style: StyleName
): Promise<CompatibilityFacts> => {
  const definition = findStyle(style);
  const served = await readServedComponentNames(style);
  const servedSet = new Set(served);
  const field = servedSet.has('field')
    ? await readStyleExports(style, 'field')
    : undefined;
  const aliasClaims = await Promise.all(
    ALIASES.filter(({ item }) => servedSet.has(item)).map(async (claim) => ({
      claim,
      module: await readStyleExports(style, claim.item),
    }))
  );
  const aliases = aliasClaims
    .filter(
      ({ claim, module }) => module.aliases.get(claim.name) === claim.local
    )
    .map(({ claim }) => claim);
  const divergences: Divergence[] = [];

  if (field && !field.names.has('FieldGroup')) {
    divergences.push(FIELD_DIVERGENCE);
  }

  if (servedSet.has('input-otp')) {
    divergences.push(INPUT_OTP_DIVERGENCE);
  }

  if (servedSet.has('toast')) {
    divergences.push(TOAST_DIVERGENCE);
  }

  divergences.push(sonnerDivergence(style, servedSet));

  if (definition?.config.iconLibrary === ICON_SUBSTITUTION.iconLibrary) {
    divergences.push(ICON_DIVERGENCE);
  }

  divergences.push(TOKEN_DIVERGENCE);

  return {
    aliases,
    compositions: definition?.compositions ?? [],
    divergences,
    incomplete: definition?.incomplete ?? false,
    notServed: definition?.incomplete
      ? await readUnservedNames(style, servedSet)
      : [],
    pending: definition?.pending ?? [],
    served,
    style,
    synthesized: SYNTHESIZED_EXPORTS.filter(({ item }) =>
      servedSet.has(item)
    ).map(({ item, names }) => ({ item, names })),
  };
};
