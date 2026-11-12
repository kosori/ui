'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { IconChevronDown } from '@tabler/icons-react';
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

export function Accordion(
  props: AccordionPrimitive.Root.Props
): React.ReactElement {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b last:border-b-0', className)}
      data-slot='accordion-item'
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-panel-open:*:data-[slot=accordion-indicator]:rotate-180',
          className
        )}
        data-slot='accordion-trigger'
        {...props}
      >
        {children}
        <IconChevronDown
          className='pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-[var(--duration-standard,240ms)] ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] motion-reduce:transition-none'
          data-slot='accordion-indicator'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Panel
      {...props}
      className='text-muted-foreground text-sm'
      data-slot='accordion-panel'
      hidden={undefined}
      keepMounted
      render={<MotionPanel />}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

const Primitive = AccordionPrimitive;

export { AccordionPanel as AccordionContent, Primitive as AccordionPrimitive };
