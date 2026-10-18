import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import ButtonExample from '@/registry/zen/button-example';

/** The Style the documentation is written against. */
const STYLE = 'zen';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/**
 * The Registry items the documentation can render, keyed by the component they
 * show. Each value is a `registry:example` name, so this is the name an install
 * resolves and the file an install writes is derived from it.
 */
const exampleItems = {
  button: 'button-example',
} satisfies Record<string, string>;

/**
 * The live components the documentation renders, keyed the same way. This is the
 * only place an item name becomes a component, so the name an install resolves
 * and the component a page renders cannot drift.
 */
const exampleComponents = {
  button: ButtonExample,
} satisfies Record<ExampleName, React.ComponentType>;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof exampleItems;

/** The Registry item a Consumer installs for an Example. */
export const exampleItemName = (name: ExampleName) => exampleItems[name];

/** The source file a Registry Example ships from, derived from its item name. */
export const exampleFileName = (name: ExampleName) =>
  `${exampleItems[name]}.tsx`;

/** Read the source a Consumer project receives, verbatim from the Registry. */
export const readExampleSource = (name: ExampleName) =>
  readFile(join(REGISTRY_DIR, STYLE, exampleFileName(name)), 'utf8');

type Props = {
  name: ExampleName;
};

/** Render a Registry Example live from the name an install would resolve. */
export const ExamplePreview = ({ name }: Props) => {
  const Example = exampleComponents[name];

  return <Example />;
};
