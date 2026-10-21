'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { type Context, createContext, useContext } from 'react';
import {
  type SegmentedControlSize,
  segmentedControlItemLayoutClassName,
  segmentedControlItemSizeClassNames,
  tabsIndicatorClassName,
} from '@/lib/segmented-control';

type TabsVariant = 'default' | 'underline' | 'line';
type TabsSize = SegmentedControlSize;

const tabsListUnderlineClassName =
  'data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent';

export const tabsListVariants = cva(
  'relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground data-[orientation=vertical]:flex-col',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'rounded-lg bg-muted p-0.5 text-muted-foreground/72',
        line: tabsListUnderlineClassName,
        underline: tabsListUnderlineClassName,
      },
    },
  }
);

const TabsListContext: Context<TabsSize> = createContext<TabsSize>('default');

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        'flex flex-col gap-2 data-[orientation=vertical]:flex-row',
        className
      )}
      data-slot='tabs'
      {...props}
    />
  );
}

export function TabsList({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  size?: TabsSize;
  variant?: TabsVariant;
}): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-size={size}
      data-slot='tabs-list'
      {...props}
    >
      <TabsListContext.Provider value={size}>
        {children}
      </TabsListContext.Provider>
      <TabsPrimitive.Indicator
        className={cn(
          tabsIndicatorClassName,
          variant === 'underline' || variant === 'line'
            ? 'z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:translate-y-px'
            : '-z-1'
        )}
        data-slot='tab-indicator'
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  size,
  ...props
}: TabsPrimitive.Tab.Props & {
  size?: TabsSize;
}): React.ReactElement {
  const contextSize: TabsSize = useContext(TabsListContext);
  const resolvedSize: TabsSize = size ?? contextSize;

  return (
    <TabsPrimitive.Tab
      className={cn(
        'relative flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:text-sm',
        segmentedControlItemLayoutClassName,
        segmentedControlItemSizeClassNames[resolvedSize],
        className
      )}
      data-size={resolvedSize}
      data-slot='tabs-tab'
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn('flex-1 outline-none', className)}
      data-slot='tabs-content'
      {...props}
    />
  );
}

const Primitive = TabsPrimitive;

export {
  Primitive as TabsPrimitive,
  TabsPanel as TabsContent,
  type TabsSize,
  TabsTab as TabsTrigger,
  type TabsVariant,
};
