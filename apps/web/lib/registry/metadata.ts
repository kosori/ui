import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** The Style the documentation is written against. */
export const STYLE = 'zen';

const REGISTRY_DIR = join(process.cwd(), 'registry');

/** A Registry Example: the item a Consumer installs and the source file it ships. */
export type Example = {
  file: string;
  name: string;
};

/**
 * The Examples the documentation can preview, keyed by the component they show.
 * Each one is a `registry:example` item, so the name here is the name an install
 * resolves and the file here is the file an install writes.
 */
export const examples = {
  button: { file: 'button-example.tsx', name: 'button-example' },
} satisfies Record<string, Example>;

/** The component names the documentation can render an Example for. */
export type ExampleName = keyof typeof examples;

/** Read the source a Consumer project receives, verbatim from the Registry. */
export const readExampleSource = (example: Example) =>
  readFile(join(REGISTRY_DIR, STYLE, example.file), 'utf8');
