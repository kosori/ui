'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { cn } from 'cn';
import { motion, useReducedMotion } from 'motion/react';
import type React from 'react';
import { useCallback, useState } from 'react';

import { useMotionTransition } from '@/lib/motion';

type MotionPanelProps = React.ComponentProps<typeof motion.div> & {
  'data-open'?: string;
};

/**
 * Spring a panel between its measured height and zero, releasing the clip once
 * it settles open so nested content is not cut off.
 */
function MotionPanel({
  className,
  ...props
}: MotionPanelProps): React.ReactElement {
  const reduce = useReducedMotion();
  const transition = useMotionTransition('smooth');
  const open = props['data-open'] !== undefined;
  const [settledOpen, setSettledOpen] = useState(open);
  const clipped = !(open && (reduce || settledOpen));
  const handleAnimationComplete = useCallback(
    () => setSettledOpen(open),
    [open]
  );

  return (
    <motion.div
      {...props}
      animate={{ height: open ? 'auto' : 0 }}
      aria-hidden={open ? undefined : true}
      className={cn(
        clipped ? 'overflow-hidden' : 'overflow-visible',
        className
      )}
      inert={open ? undefined : true}
      initial={false}
      onAnimationComplete={handleAnimationComplete}
      transition={transition}
    />
  );
}

export function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />;
}

export function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={className}
      data-slot='collapsible-trigger'
      {...props}
    />
  );
}

export function CollapsiblePanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      {...props}
      className={className}
      data-slot='collapsible-panel'
      hidden={undefined}
      keepMounted
      render={<MotionPanel />}
    />
  );
}

const Primitive = CollapsiblePrimitive;

export {
  CollapsiblePanel as CollapsibleContent,
  Primitive as CollapsiblePrimitive,
};
