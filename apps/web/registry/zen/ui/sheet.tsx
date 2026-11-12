'use client';

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { IconX } from '@tabler/icons-react';
import { cn } from 'cn';
import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  createOverlayPresence,
  motionTokens,
  useControllableOpen,
} from '@/lib/motion';

const SheetOpen = createOverlayPresence();

/** Resolve a Sheet's open state so its popup can exit before unmounting. */
export function Sheet<Payload = unknown>({
  children,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: SheetPrimitive.Root.Props<Payload>): React.ReactElement {
  const sheet = useControllableOpen<SheetPrimitive.Root.ChangeEventDetails>({
    defaultOpen,
    onOpenChange,
    open,
  });

  return (
    <SheetOpen.Provider value={sheet.open}>
      <SheetPrimitive.Root
        onOpenChange={sheet.setOpen}
        open={sheet.open}
        {...props}
      >
        {children}
      </SheetPrimitive.Root>
    </SheetOpen.Provider>
  );
}

export const SheetPortal: typeof SheetPrimitive.Portal = SheetPrimitive.Portal;

export function SheetTrigger(
  props: SheetPrimitive.Trigger.Props
): React.ReactElement {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
}

export function SheetClose(
  props: SheetPrimitive.Close.Props
): React.ReactElement {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />;
}

export function SheetBackdrop({
  className,
  render,
  ...props
}: SheetPrimitive.Backdrop.Props): React.ReactElement {
  const transition = motionTokens.spring.smooth;

  return (
    <SheetPrimitive.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm supports-[-webkit-touch-callout:none]:absolute',
        className
      )}
      data-slot='sheet-backdrop'
      render={
        render ?? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={transition}
          />
        )
      }
      {...props}
    />
  );
}

export function SheetViewport({
  className,
  side,
  variant = 'default',
  ...props
}: SheetPrimitive.Viewport.Props & {
  side?: 'right' | 'left' | 'top' | 'bottom';
  variant?: 'default' | 'inset';
}): React.ReactElement {
  return (
    <SheetPrimitive.Viewport
      className={cn(
        'fixed inset-0 z-50 grid',
        side === 'bottom' && 'grid grid-rows-[1fr_auto] pt-12',
        side === 'top' && 'grid grid-rows-[auto_1fr] pb-12',
        side === 'left' && 'flex justify-start',
        side === 'right' && 'flex justify-end',
        variant === 'inset' && 'sm:p-4',
        className
      )}
      data-slot='sheet-viewport'
      {...props}
    />
  );
}

/** The offset a Sheet enters and exits from, along the edge it opens at. */
const edgeOffset = (
  side: 'right' | 'left' | 'top' | 'bottom',
  distance: number
) => {
  switch (side) {
    case 'left':
      return { x: -distance, y: 0 };
    case 'top':
      return { x: 0, y: -distance };
    case 'bottom':
      return { x: 0, y: distance };
    default:
      return { x: distance, y: 0 };
  }
};

export function SheetPopup({
  className,
  children,
  showCloseButton = true,
  side = 'right',
  variant = 'default',
  closeProps,
  portalProps,
  render,
  ...props
}: SheetPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  side?: 'right' | 'left' | 'top' | 'bottom';
  variant?: 'default' | 'inset';
  closeProps?: SheetPrimitive.Close.Props;
  portalProps?: SheetPrimitive.Portal.Props;
}): React.ReactElement {
  const presence = SheetOpen.usePresence();
  const reduce = useReducedMotion();
  const transition = motionTokens.spring.smooth;
  const offset = edgeOffset(side, reduce ? 0 : 32);

  const popup = (
    <SheetPortal keepMounted={presence.keepMounted} {...portalProps}>
      <SheetBackdrop />
      <SheetViewport side={side} variant={variant}>
        <SheetPrimitive.Popup
          className={cn(
            'relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] max-sm:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            side === 'bottom' && 'row-start-2 border-t',
            side === 'top' && 'border-b',
            side === 'left' &&
              'w-[calc(100%-(--spacing(12)))] max-w-md border-e',
            side === 'right' &&
              'col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s',
            variant === 'inset' &&
              'before:hidden sm:rounded-2xl sm:border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=sheet-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]',
            className
          )}
          data-slot='sheet-popup'
          render={
            render ??
            ((elementProps, state) => (
              <motion.div
                {...(elementProps as HTMLMotionProps<'div'>)}
                animate={{ opacity: state.open ? 1 : 0, x: 0, y: 0 }}
                exit={{ opacity: 0, ...offset }}
                initial={{ opacity: 0, ...offset }}
                transition={transition}
              />
            ))
          }
          {...props}
        >
          {children}
          {/* biome-ignore lint/suspicious/noLeakedRender: showCloseButton is a boolean */}
          {showCloseButton && (
            <SheetPrimitive.Close
              aria-label='Close'
              className='absolute end-2 top-2'
              render={<Button size='icon' variant='ghost' />}
              {...closeProps}
            >
              <IconX />
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Popup>
      </SheetViewport>
    </SheetPortal>
  );

  return presence.wrap(popup);
}

export function SheetHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.ReactElement {
  const defaultProps = {
    className: cn(
      'flex flex-col gap-2 p-6 in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pb-3 max-sm:pb-4',
      className
    ),
    'data-slot': 'sheet-header',
  };

  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(defaultProps, props),
    render,
  });
}

export function SheetFooter({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'div'> & {
  variant?: 'default' | 'bare';
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      'flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end',
      variant === 'default' && 'border-t bg-muted/72 py-4',
      variant === 'bare' &&
        'in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pt-3 pt-4 pb-6',
      className
    ),
    'data-slot': 'sheet-footer',
  };

  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(defaultProps, props),
    render,
  });
}

export function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props): React.ReactElement {
  return (
    <SheetPrimitive.Title
      className={cn('font-bold font-heading text-xl leading-none', className)}
      data-slot='sheet-title'
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props): React.ReactElement {
  return (
    <SheetPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='sheet-description'
      {...props}
    />
  );
}

export function SheetPanel({
  className,
  scrollFade = true,
  render,
  ...props
}: useRender.ComponentProps<'div'> & {
  scrollFade?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      'p-6 in-[[data-slot=sheet-popup]:has([data-slot=sheet-header])]:pt-1 in-[[data-slot=sheet-popup]:has([data-slot=sheet-footer]:not(.border-t))]:pb-1',
      className
    ),
    'data-slot': 'sheet-panel',
  };

  return (
    <ScrollArea overscrollContain scrollFade={scrollFade}>
      {useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>(defaultProps, props),
        render,
      })}
    </ScrollArea>
  );
}

const Primitive = SheetPrimitive;

export {
  Primitive as SheetPrimitive,
  SheetBackdrop as SheetOverlay,
  SheetPopup as SheetContent,
};
