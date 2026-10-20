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
  {
    example: 'alert-example.tsx',
    reason: 'Shows the error state Alert beside the default.',
    target: 'Alert.variant',
    value: 'error',
  },
  {
    example: 'alert-example.tsx',
    reason: 'Shows the info state Alert beside the default.',
    target: 'Alert.variant',
    value: 'info',
  },
  {
    example: 'alert-example.tsx',
    reason: 'Shows the success state Alert beside the default.',
    target: 'Alert.variant',
    value: 'success',
  },
  {
    example: 'alert-example.tsx',
    reason: 'Shows the warning state Alert beside the default.',
    target: 'Alert.variant',
    value: 'warning',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the destructive Badge variant.',
    target: 'Badge.variant',
    value: 'destructive',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the info state Badge variant.',
    target: 'Badge.variant',
    value: 'info',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the outline Badge variant.',
    target: 'Badge.variant',
    value: 'outline',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the secondary Badge variant.',
    target: 'Badge.variant',
    value: 'secondary',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the success state Badge variant.',
    target: 'Badge.variant',
    value: 'success',
  },
  {
    example: 'badge-example.tsx',
    reason: 'Shows the warning state Badge variant.',
    target: 'Badge.variant',
    value: 'warning',
  },
  {
    example: 'context-menu-example.tsx',
    reason: 'Shows a destructive menu item.',
    target: 'ContextMenuItem.variant',
    value: 'destructive',
  },
  {
    example: 'dropdown-menu-example.tsx',
    reason: 'Shows the switch-style checkbox item.',
    target: 'DropdownMenuCheckboxItem.variant',
    value: 'switch',
  },
  {
    example: 'dropdown-menu-example.tsx',
    reason: 'Shows a destructive menu item.',
    target: 'DropdownMenuItem.variant',
    value: 'destructive',
  },
  {
    example: 'empty-example.tsx',
    reason: 'Shows the icon media variant.',
    target: 'EmptyMedia.variant',
    value: 'icon',
  },
] satisfies readonly ExampleOverride[];
