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
import AvatarExample from '@/registry/zen/avatar-example';
import BadgeExample from '@/registry/zen/badge-example';
import ButtonExample from '@/registry/zen/button-example';
import ButtonGroupExample from '@/registry/zen/button-group-example';
import CalendarExample from '@/registry/zen/calendar-example';
import DialogExample from '@/registry/zen/dialog-example';
import FieldExample from '@/registry/zen/field-example';
import FormExample from '@/registry/zen/form-example';
import InputExample from '@/registry/zen/input-example';
import InputGroupExample from '@/registry/zen/input-group-example';
import InputOtpExample from '@/registry/zen/input-otp-example';
import KbdExample from '@/registry/zen/kbd-example';
import LabelExample from '@/registry/zen/label-example';
import SelectExample from '@/registry/zen/select-example';
import SeparatorExample from '@/registry/zen/separator-example';
import SkeletonExample from '@/registry/zen/skeleton-example';
import SpinnerExample from '@/registry/zen/spinner-example';
import TextareaExample from '@/registry/zen/textarea-example';
import ToggleExample from '@/registry/zen/toggle-example';
import ToggleGroupExample from '@/registry/zen/toggle-group-example';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The Registry item every Style serves for a Component. Item names are part of
 * the catalog contract, so they are shared rather than restated per Style.
 */
const exampleItems = {
  avatar: 'avatar-example',
  badge: 'badge-example',
  button: 'button-example',
  'button-group': 'button-group-example',
  calendar: 'calendar-example',
  dialog: 'dialog-example',
  field: 'field-example',
  form: 'form-example',
  input: 'input-example',
  'input-group': 'input-group-example',
  'input-otp': 'input-otp-example',
  kbd: 'kbd-example',
  label: 'label-example',
  select: 'select-example',
  separator: 'separator-example',
  skeleton: 'skeleton-example',
  spinner: 'spinner-example',
  textarea: 'textarea-example',
  toggle: 'toggle-example',
  'toggle-group': 'toggle-group-example',
} as const;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof exampleItems;

/**
 * The live Example each Style ships. A Style's Example uses the same markup;
 * it differs only in the components that markup resolves to, which is why the
 * render module is bound per Style while the item name and source are shared.
 */
const exampleComponents: Record<
  StyleName,
  Partial<Record<ExampleName, ComponentType>>
> = {
  kaze: {
    button: KazeButtonExample,
    dialog: KazeDialogExample,
    field: KazeFieldExample,
    input: KazeInputExample,
    label: KazeLabelExample,
    separator: KazeSeparatorExample,
  },
  zen: {
    avatar: AvatarExample,
    badge: BadgeExample,
    button: ButtonExample,
    'button-group': ButtonGroupExample,
    calendar: CalendarExample,
    dialog: DialogExample,
    field: FieldExample,
    form: FormExample,
    input: InputExample,
    'input-group': InputGroupExample,
    'input-otp': InputOtpExample,
    kbd: KbdExample,
    label: LabelExample,
    select: SelectExample,
    separator: SeparatorExample,
    skeleton: SkeletonExample,
    spinner: SpinnerExample,
    textarea: TextareaExample,
    toggle: ToggleExample,
    'toggle-group': ToggleGroupExample,
  },
};

/** The Registry item a Consumer installs for an Example. */
export const exampleItemName = (name: ExampleName) => exampleItems[name];

/** The source file a Registry Example ships from, derived from its item name. */
export const exampleFileName = (name: ExampleName) =>
  `${exampleItems[name]}.tsx`;

/** Read the source a Consumer project receives, verbatim from the Registry. */
export const readExampleSource = (style: StyleName, name: ExampleName) =>
  readFile(join(REGISTRY_DIR, style, exampleFileName(name)), 'utf8');

type Props = {
  name: ExampleName;
  style: StyleName;
};

/** Render a Registry Example live for the Style a page documents. */
export const ExamplePreview = ({ name, style }: Props) => {
  const Example = exampleComponents[style][name];

  if (!Example) {
    throw new Error(`No ${name} Example is registered for ${style}`);
  }

  return <Example />;
};
