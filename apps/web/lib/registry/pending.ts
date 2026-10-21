/**
 * shadcn/ui names the complete catalog publishes as part of its scope but does
 * not yet serve. One list feeds both the components status page and the install
 * suite, so a name cannot be Pending and shipped at the same time.
 */
export const PENDING_COMPONENTS = [
  'attachment',
  'bubble',
  'chart',
  'code-block',
  'marker',
  'message',
  'message-scroller',
  'questionnaire',
  'trace',
] as const;
