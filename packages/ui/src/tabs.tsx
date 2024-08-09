'use client';

import { forwardRef } from 'react';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';

import { cn } from '@kosori/ui';

// --- Component:Tabs ---
export const Tabs = Root;

// --- Component:TabsList ---
type TabsListRef = React.ElementRef<typeof List>;
type TabsListProps = React.ComponentPropsWithoutRef<typeof List>;

export const TabsList = forwardRef<TabsListRef, TabsListProps>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-grey-bg p-1 text-grey-text',
        className,
      )}
      {...props}
    />
  ),
);

TabsList.displayName = List.displayName;

// --- Component:TabsTrigger ---
type TabsTriggerRef = React.ElementRef<typeof Trigger>;
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

export const TabsTrigger = forwardRef<TabsTriggerRef, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none transition-all',
        'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
        'disabled:cursor-not-allowed disabled:text-grey-solid',
        'data-[state=active]:bg-grey-base data-[state=active]:text-grey-text-contrast data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);

TabsTrigger.displayName = Trigger.displayName;

// --- Component:TabsContent ---
type TabsContentRef = React.ElementRef<typeof Content>;
type TabsContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const TabsContent = forwardRef<TabsContentRef, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn(
        'mt-2 outline-none',
        'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
        className,
      )}
      {...props}
    />
  ),
);

TabsContent.displayName = Content.displayName;
