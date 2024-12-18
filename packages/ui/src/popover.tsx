'use client';

import { forwardRef } from 'react';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const popoverStyles = tv({
  slots: {
    content: clsx(
      'z-50 w-72 rounded-lg border border-grey-line bg-grey-base p-4 shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
    ),
  },
});

const { content } = popoverStyles();

/**
 * Popover component that serves as a container for popover content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Popover component.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Place content for the popover here.</PopoverContent>
 * </Popover>
 * ```
 *
 * @see {@link https://dub.sh/ui-popover Popover Docs} for further information.
 */
export const Popover = Root;

/**
 * PopoverTrigger component that triggers the display of the popover content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the PopoverTrigger component.
 *
 * @example
 * ```tsx
 * <PopoverTrigger>Open</PopoverTrigger>
 * ```
 */
export const PopoverTrigger = Trigger;

type PopoverContentRef = React.ElementRef<typeof Content>;
type PopoverContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * PopoverContent component that displays the content of the popover.
 *
 * @param {PopoverContentProps} props - The props for the PopoverContent component.
 *
 * @example
 * ```tsx
 * <PopoverContent>Place content for the popover here.</PopoverContent>
 * ```
 */
export const PopoverContent = forwardRef<
  PopoverContentRef,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      align={align}
      className={content({ className })}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
));

PopoverContent.displayName = Content.displayName;
