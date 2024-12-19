import { Content, Root, Trigger } from '@radix-ui/react-collapsible';

/**
 * Collapsible component that allows content to be expanded or collapsed.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Collapsible component.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Yes. Free to use for personal and commercial projects. No attribution required.
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @see {@link https://dub.sh/ui-collapsible Collapsible Docs} for further information.
 */
export const Collapsible = Root;

/**
 * CollapsibleContent component that holds the content to be shown or hidden.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Content>} props - The props for the CollapsibleContent component.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   Your content goes here.
 * </CollapsibleContent>
 * ```
 */
export const CollapsibleContent = Content;

/**
 * CollapsibleTrigger component that serves as the button to toggle the Collapsible.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the CollapsibleTrigger component.
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
 * ```
 */
export const CollapsibleTrigger = Trigger;
