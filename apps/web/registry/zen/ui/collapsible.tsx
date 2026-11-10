'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { cn } from 'cn';
import type React from 'react';

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
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-[var(--motion-expand-duration,200ms)] ease-[var(--motion-expand-easing,cubic-bezier(0.2,0,0,1))] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none',
        className
      )}
      data-slot='collapsible-panel'
      {...props}
    />
  );
}

const Primitive = CollapsiblePrimitive;

export {
  CollapsiblePanel as CollapsibleContent,
  Primitive as CollapsiblePrimitive,
};
