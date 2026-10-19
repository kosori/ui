/**
 * Registry items that exist only to satisfy another item's dependencies. They
 * install and byte-match like any other item, but a Consumer never installs
 * them directly, so they have no Example, documentation page or menu entry.
 */
export const INTERNAL_ITEMS = [
  {
    name: 'autocomplete',
    reason: 'Required by command.',
    type: 'registry:ui',
  },
  {
    name: 'use-media-query',
    reason: 'Required by sidebar.',
    type: 'registry:hook',
  },
] as const;

/** The name of an Internal Registry item. */
export type InternalItemName = (typeof INTERNAL_ITEMS)[number]['name'];

/** Whether a catalog item is Internal rather than a documented component. */
export const isInternalItem = (name: string) =>
  INTERNAL_ITEMS.some((item) => item.name === name);
