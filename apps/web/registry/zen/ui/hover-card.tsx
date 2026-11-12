'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import { cn } from 'cn';
import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import type React from 'react';

import { useMotionTransition } from '@/lib/motion';

export const PreviewCard: typeof PreviewCardPrimitive.Root =
  PreviewCardPrimitive.Root;

export function PreviewCardTrigger({
  ...props
}: PreviewCardPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PreviewCardPrimitive.Trigger data-slot='preview-card-trigger' {...props} />
  );
}

export function PreviewCardPopup({
  className,
  children,
  align = 'center',
  sideOffset = 4,
  anchor,
  portalProps,
  ...props
}: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props['align'];
  sideOffset?: PreviewCardPrimitive.Positioner.Props['sideOffset'];
  anchor?: PreviewCardPrimitive.Positioner.Props['anchor'];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}): React.ReactElement {
  const reduce = useReducedMotion();
  const transition = useMotionTransition('snappy');

  return (
    <PreviewCardPrimitive.Portal {...portalProps} keepMounted>
      <PreviewCardPrimitive.Positioner
        align={align}
        anchor={anchor}
        className='z-50'
        data-slot='preview-card-positioner'
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cn(
            'relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] motion-reduce:transition-opacity motion-reduce:duration-[var(--duration-fast,160ms)] motion-reduce:ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            className
          )}
          data-slot='preview-card-content'
          // biome-ignore lint/performance/noJsxPropsBind: Base UI's render prop receives the popup state
          render={(
            elementProps: React.ComponentProps<'div'>,
            state: PreviewCardPrimitive.Popup.State
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
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

const Primitive = PreviewCardPrimitive;

export {
  PreviewCard as HoverCard,
  PreviewCardPopup as HoverCardContent,
  PreviewCardTrigger as HoverCardTrigger,
  Primitive as PreviewCardPrimitive,
};
