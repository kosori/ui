'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { cn } from 'cn';
import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import type React from 'react';

import { useMotionTransition } from '@/lib/motion';

export const TooltipCreateHandle: typeof TooltipPrimitive.createHandle =
  TooltipPrimitive.createHandle;

export const TooltipProvider: typeof TooltipPrimitive.Provider =
  TooltipPrimitive.Provider;

export const Tooltip: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;

export function TooltipTrigger(
  props: TooltipPrimitive.Trigger.Props
): React.ReactElement {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

export function TooltipPopup({
  className,
  align = 'center',
  sideOffset = 4,
  side = 'top',
  anchor,
  children,
  portalProps,
  ...props
}: TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props['align'];
  side?: TooltipPrimitive.Positioner.Props['side'];
  sideOffset?: TooltipPrimitive.Positioner.Props['sideOffset'];
  anchor?: TooltipPrimitive.Positioner.Props['anchor'];
  portalProps?: TooltipPrimitive.Portal.Props;
}): React.ReactElement {
  const reduce = useReducedMotion();
  const transition = useMotionTransition('snappy');

  return (
    <TooltipPrimitive.Portal {...portalProps} keepMounted>
      <TooltipPrimitive.Positioner
        align={align}
        anchor={anchor}
        className='z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none motion-reduce:transition-none'
        data-slot='tooltip-positioner'
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            'relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] motion-reduce:transition-opacity motion-reduce:duration-[var(--duration-fast,160ms)] motion-reduce:ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            className
          )}
          data-slot='tooltip-popup'
          // biome-ignore lint/performance/noJsxPropsBind: Base UI's render prop receives the popup state
          render={(
            elementProps: React.ComponentProps<'div'>,
            state: TooltipPrimitive.Popup.State
          ) => (
            <motion.div
              {...(elementProps as HTMLMotionProps<'div'>)}
              animate={{
                opacity: state.open ? 1 : 0,
                scale: state.open || reduce ? 1 : 0.98,
              }}
              initial={false}
              transition={state.instant ? { duration: 0 } : transition}
            />
          )}
          {...props}
        >
          <TooltipPrimitive.Viewport
            className='relative size-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:--spacing(2)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity motion-reduce:transition-none'
            data-slot='tooltip-viewport'
          >
            {children}
          </TooltipPrimitive.Viewport>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

const Primitive = TooltipPrimitive;

export { Primitive as TooltipPrimitive, TooltipPopup as TooltipContent };
