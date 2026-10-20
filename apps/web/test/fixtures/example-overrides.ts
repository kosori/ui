/**
 * Deliberate departures from a component's shipped default in an Example.
 *
 * Every entry is reviewed: an Example should show the design a Consumer
 * installs, so an override belongs here only when the Example's job is to
 * demonstrate the override itself.
 */
export type ExampleOverride = {
  /** The Example file the override lives in. */
  example: string;
  /** Why the Example deliberately departs from the shipped default. */
  reason: string;
  /** `Component.prop` or `Component.className` the override touches. */
  target: string;
  /** The value or class the override contains. */
  value: string;
};

export const EXAMPLE_OVERRIDES = [
  {
    example: 'card-example.tsx',
    reason: 'Submits the demo project form.',
    target: 'Button.type',
    value: 'submit',
  },
  {
    example: 'form-example.tsx',
    reason: 'Submits the demo sign-in form.',
    target: 'Button.type',
    value: 'submit',
  },
] satisfies readonly ExampleOverride[];
