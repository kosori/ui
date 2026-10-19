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
import BadgeExample from '@/registry/zen/badge-example';
import ButtonExample from '@/registry/zen/button-example';
import CalendarExample from '@/registry/zen/calendar-example';
import CheckboxExample from '@/registry/zen/checkbox-example';
import DialogExample from '@/registry/zen/dialog-example';
import FieldExample from '@/registry/zen/field-example';
import InputExample from '@/registry/zen/input-example';
import KbdExample from '@/registry/zen/kbd-example';
import LabelExample from '@/registry/zen/label-example';
import RadioGroupExample from '@/registry/zen/radio-group-example';
import SeparatorExample from '@/registry/zen/separator-example';
import SliderExample from '@/registry/zen/slider-example';
import SpinnerExample from '@/registry/zen/spinner-example';
import SwitchExample from '@/registry/zen/switch-example';
import TextareaExample from '@/registry/zen/textarea-example';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The Registry item every Style serves for a Component. Item names are part of
 * the catalog contract, so they are shared rather than restated per Style.
 */
const exampleItems = {
  badge: 'badge-example',
  button: 'button-example',
  calendar: 'calendar-example',
  checkbox: 'checkbox-example',
  dialog: 'dialog-example',
  field: 'field-example',
  input: 'input-example',
  kbd: 'kbd-example',
  label: 'label-example',
  'radio-group': 'radio-group-example',
  separator: 'separator-example',
  slider: 'slider-example',
  spinner: 'spinner-example',
  switch: 'switch-example',
  textarea: 'textarea-example',
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
    badge: BadgeExample,
    button: ButtonExample,
    calendar: CalendarExample,
    checkbox: CheckboxExample,
    dialog: DialogExample,
    field: FieldExample,
    input: InputExample,
    kbd: KbdExample,
    label: LabelExample,
    'radio-group': RadioGroupExample,
    separator: SeparatorExample,
    slider: SliderExample,
    spinner: SpinnerExample,
    switch: SwitchExample,
    textarea: TextareaExample,
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
