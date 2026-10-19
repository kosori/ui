/**
 * Catalog items that are implementation details of another item. They install
 * as dependencies but ship no Example, page or menu entry of their own.
 */
export const INTERNAL_ITEMS = ['segmented-control'] as const;

/** Whether a catalog item is an implementation detail rather than a component. */
export const isInternalItem = (name: string) =>
  INTERNAL_ITEMS.some((item) => item === name);
