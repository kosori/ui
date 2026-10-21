'use client';

import { cn } from 'cn';
import type React from 'react';
import {
  Group as GroupPrimitive,
  type GroupProps,
  Panel as PanelPrimitive,
  type PanelProps,
  Separator as SeparatorPrimitive,
  type SeparatorProps,
} from 'react-resizable-panels';

export function ResizablePanelGroup({
  className,
  ...props
}: GroupProps): React.ReactElement {
  return (
    <GroupPrimitive
      className={cn(
        'relative flex h-full w-full overflow-hidden rounded-2xl border bg-card not-dark:bg-clip-padding text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] aria-[orientation=vertical]:flex-col dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot='resizable-panel-group'
      {...props}
    />
  );
}

export function ResizablePanel({ ...props }: PanelProps): React.ReactElement {
  return <PanelPrimitive data-slot='resizable-panel' {...props} />;
}

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean;
}): React.ReactElement {
  return (
    <SeparatorPrimitive
      className={cn(
        'relative flex w-px shrink-0 items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
        className
      )}
      data-slot='resizable-handle'
      {...props}
    >
      {withHandle ? (
        <div className='z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border' />
      ) : null}
    </SeparatorPrimitive>
  );
}
