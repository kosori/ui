/**
 * shadcn/ui names with no coss/ui equivalent yet. One list feeds both the
 * components status page and the install suite, so a name cannot be Pending
 * and shipped at the same time.
 */
export const PENDING_COMPONENTS = [
  'aspect-ratio',
  'attachment',
  'bubble',
  'carousel',
  'chart',
  'code-block',
  'data-table',
  'direction',
  'item',
  'marker',
  'menubar',
  'message',
  'message-scroller',
  'native-select',
  'navigation-menu',
  'questionnaire',
  'resizable',
  'trace',
  'typography',
] as const;
