import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ComponentType } from 'react';
import { ButtonExample as KazeButtonExample } from '@/lib/registry/previews/kaze/button-example';
import { DialogExample as KazeDialogExample } from '@/lib/registry/previews/kaze/dialog-example';
import { FieldExample as KazeFieldExample } from '@/lib/registry/previews/kaze/field-example';
import { InputExample as KazeInputExample } from '@/lib/registry/previews/kaze/input-example';
import { LabelExample as KazeLabelExample } from '@/lib/registry/previews/kaze/label-example';
import { SeparatorExample as KazeSeparatorExample } from '@/lib/registry/previews/kaze/separator-example';
import type { StyleName } from '@/registry/preset';
import AccordionExample from '@/registry/zen/examples/accordion-example';
import AlertDialogExample from '@/registry/zen/examples/alert-dialog-example';
import AlertExample from '@/registry/zen/examples/alert-example';
import AspectRatioExample from '@/registry/zen/examples/aspect-ratio-example';
import AvatarExample from '@/registry/zen/examples/avatar-example';
import BadgeExample from '@/registry/zen/examples/badge-example';
import BreadcrumbExample from '@/registry/zen/examples/breadcrumb-example';
import ButtonExample from '@/registry/zen/examples/button-example';
import ButtonGroupExample from '@/registry/zen/examples/button-group-example';
import CalendarExample from '@/registry/zen/examples/calendar-example';
import CardExample from '@/registry/zen/examples/card-example';
import CheckboxExample from '@/registry/zen/examples/checkbox-example';
import CollapsibleExample from '@/registry/zen/examples/collapsible-example';
import ComboboxExample from '@/registry/zen/examples/combobox-example';
import CommandExample from '@/registry/zen/examples/command-example';
import ContextMenuExample from '@/registry/zen/examples/context-menu-example';
import DialogExample from '@/registry/zen/examples/dialog-example';
import DirectionExample from '@/registry/zen/examples/direction-example';
import DrawerExample from '@/registry/zen/examples/drawer-example';
import DropdownMenuExample from '@/registry/zen/examples/dropdown-menu-example';
import EmptyExample from '@/registry/zen/examples/empty-example';
import FieldExample from '@/registry/zen/examples/field-example';
import FormExample from '@/registry/zen/examples/form-example';
import HoverCardExample from '@/registry/zen/examples/hover-card-example';
import InputExample from '@/registry/zen/examples/input-example';
import InputGroupExample from '@/registry/zen/examples/input-group-example';
import InputOtpExample from '@/registry/zen/examples/input-otp-example';
import KbdExample from '@/registry/zen/examples/kbd-example';
import LabelExample from '@/registry/zen/examples/label-example';
import PaginationExample from '@/registry/zen/examples/pagination-example';
import PopoverExample from '@/registry/zen/examples/popover-example';
import ProgressExample from '@/registry/zen/examples/progress-example';
import RadioGroupExample from '@/registry/zen/examples/radio-group-example';
import ScrollAreaExample from '@/registry/zen/examples/scroll-area-example';
import SelectExample from '@/registry/zen/examples/select-example';
import SeparatorExample from '@/registry/zen/examples/separator-example';
import SheetExample from '@/registry/zen/examples/sheet-example';
import SidebarExample from '@/registry/zen/examples/sidebar-example';
import SkeletonExample from '@/registry/zen/examples/skeleton-example';
import SliderExample from '@/registry/zen/examples/slider-example';
import SpinnerExample from '@/registry/zen/examples/spinner-example';
import SwitchExample from '@/registry/zen/examples/switch-example';
import TableExample from '@/registry/zen/examples/table-example';
import TabsExample from '@/registry/zen/examples/tabs-example';
import TextareaExample from '@/registry/zen/examples/textarea-example';
import ToastExample from '@/registry/zen/examples/toast-example';
import ToggleExample from '@/registry/zen/examples/toggle-example';
import ToggleGroupExample from '@/registry/zen/examples/toggle-group-example';
import TooltipExample from '@/registry/zen/examples/tooltip-example';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The directory a Style keeps its Example sources in. `kaze` predates the
 * registry split, so it keeps the flat layout it ships today.
 */
const EXAMPLE_DIRS: Record<StyleName, string> = {
  kaze: '',
  zen: 'examples',
};

/**
 * The live zen Example for each component. Item names derive from these keys,
 * so a component and its Example cannot drift apart.
 */
const zenExampleComponents = {
  accordion: AccordionExample,
  alert: AlertExample,
  'alert-dialog': AlertDialogExample,
  'aspect-ratio': AspectRatioExample,
  avatar: AvatarExample,
  badge: BadgeExample,
  breadcrumb: BreadcrumbExample,
  button: ButtonExample,
  'button-group': ButtonGroupExample,
  calendar: CalendarExample,
  card: CardExample,
  checkbox: CheckboxExample,
  collapsible: CollapsibleExample,
  combobox: ComboboxExample,
  command: CommandExample,
  'context-menu': ContextMenuExample,
  dialog: DialogExample,
  direction: DirectionExample,
  drawer: DrawerExample,
  'dropdown-menu': DropdownMenuExample,
  empty: EmptyExample,
  field: FieldExample,
  form: FormExample,
  'hover-card': HoverCardExample,
  input: InputExample,
  'input-group': InputGroupExample,
  'input-otp': InputOtpExample,
  kbd: KbdExample,
  label: LabelExample,
  pagination: PaginationExample,
  popover: PopoverExample,
  progress: ProgressExample,
  'radio-group': RadioGroupExample,
  'scroll-area': ScrollAreaExample,
  select: SelectExample,
  separator: SeparatorExample,
  sheet: SheetExample,
  sidebar: SidebarExample,
  skeleton: SkeletonExample,
  slider: SliderExample,
  spinner: SpinnerExample,
  switch: SwitchExample,
  table: TableExample,
  tabs: TabsExample,
  textarea: TextareaExample,
  toast: ToastExample,
  toggle: ToggleExample,
  'toggle-group': ToggleGroupExample,
  tooltip: TooltipExample,
} satisfies Partial<Record<string, ComponentType>>;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof zenExampleComponents;

/**
 * The live Example each Style ships. A Style's Example uses the same markup;
 * it differs only in the components that markup resolves to, which is why the
 * render module is bound per Style while the item name and source are shared.
 */
const exampleComponents = {
  kaze: {
    button: KazeButtonExample,
    dialog: KazeDialogExample,
    field: KazeFieldExample,
    input: KazeInputExample,
    label: KazeLabelExample,
    separator: KazeSeparatorExample,
  },
  zen: zenExampleComponents,
} satisfies Record<StyleName, Partial<Record<ExampleName, ComponentType>>>;

/** The Registry item a Consumer installs for an Example. */
export const exampleItemName = (name: ExampleName) => `${name}-example`;

/** The source file a Registry Example ships from, derived from its item name. */
export const exampleFileName = (name: ExampleName) =>
  `${exampleItemName(name)}.tsx`;

/** Read the source a Consumer project receives, verbatim from the Registry. */
export const readExampleSource = (style: StyleName, name: ExampleName) =>
  readFile(
    join(REGISTRY_DIR, style, EXAMPLE_DIRS[style], exampleFileName(name)),
    'utf8'
  );

type Props = {
  name: ExampleName;
  style: StyleName;
};

/** Render a Registry Example live for the Style a page documents. */
export const ExamplePreview = ({ name, style }: Props) => {
  const StyleExamples: Partial<Record<ExampleName, ComponentType>> =
    exampleComponents[style];
  const Example = StyleExamples[name];

  if (!Example) {
    throw new Error(`No ${name} Example is registered for ${style}`);
  }

  return <Example />;
};
