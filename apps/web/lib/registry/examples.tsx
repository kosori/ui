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
import ButtonExample from '@/registry/zen/button-example';
import DialogExample from '@/registry/zen/dialog-example';
import FieldExample from '@/registry/zen/field-example';
import InputExample from '@/registry/zen/input-example';
import LabelExample from '@/registry/zen/label-example';
import SeparatorExample from '@/registry/zen/separator-example';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The Registry item every Style serves for a Component. Item names are part of
 * the catalog contract, so they are shared rather than restated per Style.
 */
const exampleItems = {
  button: 'button-example',
  dialog: 'dialog-example',
  field: 'field-example',
  input: 'input-example',
  label: 'label-example',
  separator: 'separator-example',
} as const;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof exampleItems;

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
  zen: {
    button: ButtonExample,
    dialog: DialogExample,
    field: FieldExample,
    input: InputExample,
    label: LabelExample,
    separator: SeparatorExample,
  },
} satisfies Record<StyleName, Record<ExampleName, ComponentType>>;

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

  return <Example />;
};
