'use client';

import { forwardRef } from 'react';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const tabsStyles = tv({
  slots: {
    list: 'inline-flex h-9 items-center justify-center rounded-lg bg-grey-bg p-1 text-grey-text',
    trigger: clsx(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none transition-all',
      'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
      'disabled:cursor-not-allowed disabled:text-grey-solid',
      'data-[state=active]:bg-grey-base data-[state=active]:text-grey-text-contrast data-[state=active]:shadow-sm',
    ),
    content: clsx(
      'mt-2 outline-none',
      'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
    ),
  },
});

const { list, trigger, content } = tabsStyles();

/**
 * Tabs component that serves as a container for tabbed navigation.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Tabs component.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue='account' className='w-[400px]'>
 *   <TabsList>
 *     <TabsTrigger value='account'>Account</TabsTrigger>
 *     <TabsTrigger value='password'>Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value='account'>Make changes to your account here.</TabsContent>
 *   <TabsContent value='password'>Change your password here.</TabsContent>
 * </Tabs>
 * ```
 *
 * @see {@link https://dub.sh/ui-tabs Tabs Docs} for further information.
 */
export const Tabs = Root;

type TabsListRef = React.ElementRef<typeof List>;
type TabsListProps = React.ComponentPropsWithoutRef<typeof List>;

/**
 * TabsList component that represents the list of tab triggers.
 *
 * @param {TabsListProps} props - The props for the TabsList component.
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value='account'>Account</TabsTrigger>
 * </TabsList>
 * ```
 */
export const TabsList = forwardRef<TabsListRef, TabsListProps>(
  ({ className, ...props }, ref) => (
    <List ref={ref} className={list({ className })} {...props} />
  ),
);

TabsList.displayName = List.displayName;

type TabsTriggerRef = React.ElementRef<typeof Trigger>;
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

/**
 * TabsTrigger component that represents an individual tab trigger.
 *
 * @param {TabsTriggerProps} props - The props for the TabsTrigger component.
 *
 * @example
 * ```tsx
 * <TabsTrigger value='account'>Account</TabsTrigger>
 * ```
 */
export const TabsTrigger = forwardRef<TabsTriggerRef, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <Trigger ref={ref} className={trigger({ className })} {...props} />
  ),
);

TabsTrigger.displayName = Trigger.displayName;

type TabsContentRef = React.ElementRef<typeof Content>;
type TabsContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * TabsContent component that displays the content associated with a tab.
 *
 * @param {TabsContentProps} props - The props for the TabsContent component.
 *
 * @example
 * ```tsx
 * <TabsContent value='account'>Account details go here.</TabsContent>
 * ```
 */
export const TabsContent = forwardRef<TabsContentRef, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <Content ref={ref} className={content({ className })} {...props} />
  ),
);

TabsContent.displayName = Content.displayName;
