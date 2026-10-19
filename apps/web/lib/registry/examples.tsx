import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ComponentType } from 'react';
import ButtonExample from '@/registry/zen/button-example';
import DialogExample from '@/registry/zen/dialog-example';
import FieldExample from '@/registry/zen/field-example';
import InputExample from '@/registry/zen/input-example';
import LabelExample from '@/registry/zen/label-example';
import SeparatorExample from '@/registry/zen/separator-example';

/** The Style the documentation is written against. */
const STYLE = 'zen';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The Examples the documentation can render, keyed by the Component they show.
 * Each carries the `registry:example` item an install resolves and the live
 * component a page renders, so the name and the component cannot drift.
 */
const examples = {
  button: { component: ButtonExample, item: 'button-example' },
  dialog: { component: DialogExample, item: 'dialog-example' },
  field: { component: FieldExample, item: 'field-example' },
  input: { component: InputExample, item: 'input-example' },
  label: { component: LabelExample, item: 'label-example' },
  separator: { component: SeparatorExample, item: 'separator-example' },
} satisfies Record<string, { component: ComponentType; item: string }>;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof examples;

/** The Registry item a Consumer installs for an Example. */
export const exampleItemName = (name: ExampleName) => examples[name].item;

/** The source file a Registry Example ships from, derived from its item name. */
export const exampleFileName = (name: ExampleName) =>
  `${examples[name].item}.tsx`;

/** Read the source a Consumer project receives, verbatim from the Registry. */
export const readExampleSource = (name: ExampleName) =>
  readFile(join(REGISTRY_DIR, STYLE, exampleFileName(name)), 'utf8');

type Props = {
  name: ExampleName;
};

/** Render a Registry Example live from the name an install would resolve. */
export const ExamplePreview = ({ name }: Props) => {
  const Example = examples[name].component;

  return <Example />;
};
