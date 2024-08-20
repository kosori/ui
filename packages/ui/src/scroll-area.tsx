'use client';

import { forwardRef } from 'react';
import {
  Corner,
  Root,
  ScrollAreaThumb,
  ScrollAreaScrollbar as Scrollbar,
  Viewport,
} from '@radix-ui/react-scroll-area';
import { tv } from 'tailwind-variants';

const scrollAreaStyles = tv({
  slots: {
    base: 'relative overflow-hidden',
    viewport: 'size-full rounded-[inherit]',
    scrollbar: 'flex touch-none select-none transition-colors',
    thumb: 'relative flex-1 rounded-full bg-grey-line',
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: 'h-full w-2.5 border-l border-l-transparent p-px',
      },
      horizontal: {
        scrollbar: 'h-2.5 w-full border-t border-t-transparent p-px',
      },
    },
  },
});

const { base, viewport, scrollbar, thumb } = scrollAreaStyles();

type ScrollAreaRef = React.ElementRef<typeof Root>;
type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * ScrollArea component that provides a scrollable area for content.
 *
 * @param {ScrollAreaProps} props - The props for the ScrollArea component.
 *
 * @example
 * <ScrollArea className='h-[200px] w-[350px] rounded-md border p-4'>
 *   Jokester began sneaking into the castle in the middle of the night and leaving
 *   jokes all over the place: under the king's pillow, in his soup, even in the
 *   royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
 *   then, one day, the people of the kingdom discovered that the jokes left by
 *   Jokester were so funny that they couldn't help but laugh. And once they
 *   started laughing, they couldn't stop.
 * </ScrollArea>
 *
 * @see {@link https://dub.sh/ui-scroll-area ScrollArea Docs} for further information.
 */
/**
 * ScrollAreaScrollbar component that represents the scrollbar within the scroll area.
 *
 * @param {ScrollAreaScrollbarProps} props - The props for the ScrollAreaScrollbar component.
 *
 * @example
 * <ScrollAreaScrollbar orientation='vertical' />
 */
export const ScrollArea = forwardRef<ScrollAreaRef, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props}>
      <Viewport className={viewport()}>{children}</Viewport>
      <ScrollAreaScrollbar />
      <Corner />
    </Root>
  ),
);

ScrollArea.displayName = Root.displayName;

type ScrollAreaScrollbarRef = React.ElementRef<typeof Scrollbar>;
type ScrollAreaScrollbarProps = React.ComponentPropsWithoutRef<
  typeof Scrollbar
>;

/**
 * ScrollAreaScrollbar component that represents the scrollbar within the scroll area.
 *
 * @param {ScrollAreaScrollbarProps} props - The props for the ScrollAreaScrollbar component.
 *
 * @example
 * <ScrollAreaScrollbar orientation='vertical' />
 */
export const ScrollAreaScrollbar = forwardRef<
  ScrollAreaScrollbarRef,
  ScrollAreaScrollbarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <Scrollbar
    ref={ref}
    className={scrollbar({ className, orientation })}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaThumb className={thumb()} />
  </Scrollbar>
));

ScrollAreaScrollbar.displayName = Scrollbar.displayName;
