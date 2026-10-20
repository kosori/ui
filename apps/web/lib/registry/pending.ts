/**
 * shadcn/ui names the complete catalog publishes as part of its scope but does
 * not yet serve. One list feeds both the components status page and the install
 * suite, so a name cannot be Pending and shipped at the same time.
 */
export const PENDING_COMPONENTS = [
  'attachment',
  'bubble',
  'carousel',
  'chart',
  'code-block',
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
] as const;
