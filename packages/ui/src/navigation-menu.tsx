'use client';

import { forwardRef } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';

import { cn } from '@kosori/ui';

// --- Component:NavigationMenu ---
type NavigationMenuRef = React.ElementRef<typeof Root>;
type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof Root>;

export const NavigationMenu = forwardRef<
  NavigationMenuRef,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'relative z-10 flex flex-1 items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </Root>
));

NavigationMenu.displayName = Root.displayName;

// --- Component:NavigationMenuList ---j
type NavigationMenuListRef = React.ElementRef<typeof List>;
type NavigationMenuListProps = React.ComponentPropsWithoutRef<typeof List>;

export const NavigationMenuList = forwardRef<
  NavigationMenuListRef,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className,
    )}
    {...props}
  />
));

NavigationMenuList.displayName = List.displayName;

// --- Component:NavigationMenuItem ---
export const NavigationMenuItem = Item;

export const navigationMenuTriggerStyle = cn(
  'group inline-flex h-10 w-max items-center justify-center rounded-lg bg-grey-base px-4 py-2 text-sm font-medium transition-colors duration-200',
  'hover:bg-primary-bg-hover',
  'active:bg-primary-bg-bctive',
  'focus:bg-primary-bg-hover focus:outline-none',
  'data-[state=open]:bg-primary-bg-active',
  'disabled:cursor-not-allowed disabled:text-grey-solid',
  'disabled:hover:bg-grey-base',
);

// --- Component:NavigationMenuTrigger ---
type NavigationMenuTriggerRef = React.ElementRef<typeof Trigger>;
type NavigationMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof Trigger
>;

export const NavigationMenuTrigger = forwardRef<
  NavigationMenuTriggerRef,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle, className)}
    {...props}
  >
    {children}
    <ChevronDownIcon
      className={cn(
        'relative top-px ml-1 h-3 w-3 transition-transform duration-200',
        'group-data-[state=open]:rotate-180',
      )}
    />
  </Trigger>
));

NavigationMenuTrigger.displayName = Trigger.displayName;

// --- Component:NavigationMenuContent ---
type NavigationMenuContentRef = React.ElementRef<typeof Content>;
type NavigationMenuContentProps = React.ComponentPropsWithoutRef<
  typeof Content
>;

export const NavigationMenuContent = forwardRef<
  NavigationMenuContentRef,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      'left-0 top-0 z-50 w-full',
      'md:absolute md:w-auto',
      'data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in',
      'data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out',
      'data-[motion=from-end]:slide-in-from-right-52',
      'data-[motion=from-start]:slide-in-from-left-52',
      'data-[motion=to-end]:slide-out-to-right-52',
      'data-[motion=to-start]:slide-out-to-left-52',
      className,
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = Content.displayName;

// --- Component:NavigationMenuLink ---
export const NavigationMenuLink = Link;

// --- Component:NavigationMenuIndicator ---
type NavigationMenuIndicatorRef = React.ElementRef<typeof Indicator>;
type NavigationMenuIndicatorProps = React.ComponentPropsWithRef<
  typeof Indicator
>;

export const NavigationMenuIndicator = forwardRef<
  NavigationMenuIndicatorRef,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-in data-[state=visible]:fade-in',
      'data-[state=hidden]:animate-out data-[state=hidden]:fade-out',
      className,
    )}
    {...props}
  >
    <div className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-grey-line shadow-md' />
  </Indicator>
));

NavigationMenuIndicator.displayName = Indicator.displayName;

// --- Component:NavigationMenuViewport ---
type NavigationMenuViewportRef = React.ElementRef<typeof Viewport>;
type NavigationMenuViewportProps = React.ComponentPropsWithoutRef<
  typeof Viewport
>;

export const NavigationMenuViewport = forwardRef<
  NavigationMenuViewportRef,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className='absolute left-0 top-full flex justify-center'>
    <Viewport
      ref={ref}
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-grey-line bg-grey-base shadow-md',
        'md:w-[var(--radix-navigation-menu-viewport-width)]',
        'data-[state=open]:animate-in data-[state=open]:zoom-in-90',
        'data-[state=closed]:animate-out data-[state=closed]:zoom-out-95',
        className,
      )}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName = Viewport.displayName;
