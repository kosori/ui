'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import type React from 'react';

import { Separator } from '@/components/ui/separator';

export function ItemGroup({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    // biome-ignore lint/a11y/useSemanticElements: shadcn/ui gives ItemGroup role=list on a div, and its children include non-list parts
    <div
      className={cn(
        'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
        className
      )}
      data-slot='item-group'
      role='list'
      {...props}
    />
  );
}

export function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <Separator
      className={cn('my-2', className)}
      data-slot='item-separator'
      orientation='horizontal'
      {...props}
    />
  );
}

const itemVariants = cva(
  'group/item flex w-full flex-wrap items-center rounded-lg border bg-card not-dark:bg-clip-padding text-card-foreground text-sm shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] [a]:transition-colors [a]:hover:bg-muted',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'gap-2.5 px-3 py-2.5',
        sm: 'gap-2.5 px-3 py-2.5',
        xs: 'gap-2 in-data-[slot=dropdown-menu-content]:p-0 px-2.5 py-2',
      },
      variant: {
        default: 'border-transparent',
        muted: 'border-transparent bg-muted/50',
        outline: 'border-border',
      },
    },
  }
);

export function Item({
  className,
  render,
  size = 'default',
  variant = 'default',
  ...props
}: useRender.ComponentProps<'div'> &
  VariantProps<typeof itemVariants>): React.ReactElement {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(itemVariants({ className, size, variant })),
      },
      props
    ),
    render,
    state: {
      size,
      slot: 'item',
      variant,
    },
  });
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: '',
        image:
          'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover',
      },
    },
  }
);

export function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof itemMediaVariants>): React.ReactElement {
  return (
    <div
      className={cn(itemMediaVariants({ className, variant }))}
      data-slot='item-media'
      data-variant={variant}
      {...props}
    />
  );
}

export function ItemContent({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
        className
      )}
      data-slot='item-content'
      {...props}
    />
  );
}

export function ItemTitle({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'line-clamp-1 flex w-fit items-center gap-2 font-medium text-sm leading-snug underline-offset-4',
        className
      )}
      data-slot='item-title'
      {...props}
    />
  );
}

export function ItemDescription({
  className,
  ...props
}: React.ComponentProps<'p'>): React.ReactElement {
  return (
    <p
      className={cn(
        'line-clamp-2 text-left font-normal text-muted-foreground text-xs leading-normal [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      data-slot='item-description'
      {...props}
    />
  );
}

export function ItemActions({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-slot='item-actions'
      {...props}
    />
  );
}

export function ItemHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      data-slot='item-header'
      {...props}
    />
  );
}

export function ItemFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      data-slot='item-footer'
      {...props}
    />
  );
}
