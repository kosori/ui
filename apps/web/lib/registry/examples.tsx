import type { ExampleName } from '@/lib/registry/metadata';
import ButtonExample from '@/registry/zen/button-example';

/**
 * The live components the documentation renders, by Example name. This is the
 * only place a name becomes a component, so the name an install resolves and the
 * component a page renders cannot drift.
 */
const exampleComponents = {
  button: ButtonExample,
} satisfies Record<ExampleName, React.ComponentType>;

/** Render a Registry Example live from the name an install would resolve. */
export const ExamplePreview = ({ name }: { name: ExampleName }) => {
  const Example = exampleComponents[name];

  return <Example />;
};
