/**
 * Documented patterns that upstream publishes only as documentation. A
 * Composition has a page but no installable name, and never becomes a Registry
 * item.
 */
export const COMPOSITIONS = [
  'data-table',
  'date-picker',
  'typography',
] as const;

/** A documented pattern that is not a Registry item. */
export type CompositionName = (typeof COMPOSITIONS)[number];

/** Whether a documented name is a Composition rather than an installable item. */
export const isComposition = (name: string) =>
  COMPOSITIONS.some((composition) => composition === name);
