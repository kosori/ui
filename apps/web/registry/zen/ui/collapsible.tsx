'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import type React from 'react';

import { MotionPanel } from '@/lib/motion';

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
