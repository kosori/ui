'use client';

import { forwardRef } from 'react';
import {
  Corner,
  Root,
  ScrollAreaThumb,
  ScrollAreaScrollbar as Scrollbar,
  Viewport,
} from '@radix-ui/react-scroll-area';

import { cn } from '@kosori/ui';

// --- Component:ScrollArea ---
type ScrollAreaRef = React.ElementRef<typeof Root>;
type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof Root>;

export const ScrollArea = forwardRef<ScrollAreaRef, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <Viewport className='h-full w-full rounded-[inherit]'>
        {children}
      </Viewport>
      <ScrollAreaScrollbar />
      <Corner />
    </Root>
  ),
);

ScrollArea.displayName = Root.displayName;

// --- Component:ScrollAreaScrollbar ---
type ScrollAreaScrollbarRef = React.ElementRef<typeof Scrollbar>;
type ScrollAreaScrollbarProps = React.ComponentPropsWithoutRef<
  typeof Scrollbar
>;

export const ScrollAreaScrollbar = forwardRef<
  ScrollAreaScrollbarRef,
  ScrollAreaScrollbarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <Scrollbar
    ref={ref}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-px',
      className,
    )}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaThumb className='relative flex-1 rounded-full bg-grey-line' />
  </Scrollbar>
));

ScrollAreaScrollbar.displayName = Scrollbar.displayName;
