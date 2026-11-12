'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cn } from 'cn';
import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import type React from 'react';
import {
  createOverlayPresence,
  motionTokens,
  useControllableOpen,
} from '@/lib/motion';

const PopoverOpen = createOverlayPresence();

export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =
  PopoverPrimitive.createHandle;

/** Resolve a Popover's open state so its popup can exit before unmounting. */
export function Popover<Payload = unknown>({
  children,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: PopoverPrimitive.Root.Props<Payload>): React.ReactElement {
  const popover = useControllableOpen<PopoverPrimitive.Root.ChangeEventDetails>(
    {
      defaultOpen,
      onOpenChange,
      open,
    }
  );

  return (
    <PopoverOpen.Provider value={popover.open}>
      <PopoverPrimitive.Root
        onOpenChange={popover.setOpen}
        open={popover.open}
        {...props}
      >
        {children}
      </PopoverPrimitive.Root>
    </PopoverOpen.Provider>
  );
}

export function PopoverTrigger({
  className,
  children,
  ...props
}: PopoverPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Trigger
      className={className}
      data-slot='popover-trigger'
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export function PopoverPopup({
  children,
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  portalProps,
  render,
  ...props
}: PopoverPrimitive.Popup.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
  side?: PopoverPrimitive.Positioner.Props['side'];
  align?: PopoverPrimitive.Positioner.Props['align'];
  sideOffset?: PopoverPrimitive.Positioner.Props['sideOffset'];
  alignOffset?: PopoverPrimitive.Positioner.Props['alignOffset'];
  tooltipStyle?: boolean;
  anchor?: PopoverPrimitive.Positioner.Props['anchor'];
}): React.ReactElement {
  const presence = PopoverOpen.usePresence();
  const reduce = useReducedMotion();
  const transition = motionTokens.spring.snappy;
  const scale = reduce ? 1 : 0.98;

  const popup = (
    <PopoverPrimitive.Portal
      keepMounted={presence.keepMounted}
      {...portalProps}
    >
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className='z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none'
        data-slot='popover-positioner'
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            'relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height] duration-[var(--duration-fast,160ms)] ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)] motion-reduce:transition-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            tooltipStyle &&
              'w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]',
            className
          )}
          data-slot='popover-popup'
          render={
            render ??
            ((elementProps, state) => (
              <motion.div
                {...(elementProps as HTMLMotionProps<'div'>)}
                animate={{ opacity: state.open ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale }}
                initial={{ opacity: 0, scale }}
                transition={transition}
              />
            ))
          }
          {...props}
        >
          <PopoverPrimitive.Viewport
            className={cn(
              'relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2 data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity',
              tooltipStyle
                ? 'py-1 [--viewport-inline-padding:--spacing(2)]'
                : 'not-data-transitioning:overflow-y-auto'
            )}
            data-slot='popover-viewport'
          >
            {children}
          </PopoverPrimitive.Viewport>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );

  return presence.wrap(popup);
}

export function PopoverClose({
  ...props
}: PopoverPrimitive.Close.Props): React.ReactElement {
  return <PopoverPrimitive.Close data-slot='popover-close' {...props} />;
}

/** Group a popover's title and description. */
export function PopoverHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn('flex flex-col gap-2', className)}
      data-slot='popover-header'
      {...props}
    />
  );
}

export function PopoverTitle({
  className,
  ...props
}: PopoverPrimitive.Title.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Title
      className={cn('font-semibold text-lg leading-none', className)}
      data-slot='popover-title'
      {...props}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='popover-description'
      {...props}
    />
  );
}

const Primitive = PopoverPrimitive;

export { PopoverPopup as PopoverContent, Primitive as PopoverPrimitive };
