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
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const navigationMenuStyles = tv({
  slots: {
    base: 'relative z-10 flex flex-1 items-center justify-center',
    list: 'group flex flex-1 list-none items-center justify-center space-x-1',
    trigger: clsx(
      'group inline-flex h-9 w-max items-center justify-center rounded-lg bg-grey-base px-4 py-2 text-sm font-medium transition-colors duration-200',
      'hover:bg-primary-bg-hover',
      'active:bg-primary-bg-bctive',
      'focus:bg-primary-bg-hover focus:outline-none',
      'data-[state=open]:bg-primary-bg-active',
      'disabled:cursor-not-allowed disabled:text-grey-solid',
      'disabled:hover:bg-grey-base',
    ),
    triggerIcon: clsx(
      'relative top-px ml-1 h-3 w-3 transition-transform duration-200',
      'group-data-[state=open]:rotate-180',
    ),
    content: clsx(
      'left-0 top-0 z-50 w-full',
      'md:absolute md:w-auto',
      'data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in',
      'data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out',
      'data-[motion=from-end]:slide-in-from-right-52',
      'data-[motion=from-start]:slide-in-from-left-52',
      'data-[motion=to-end]:slide-out-to-right-52',
      'data-[motion=to-start]:slide-out-to-left-52',
    ),
    indicator: clsx(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-in data-[state=visible]:fade-in',
      'data-[state=hidden]:animate-out data-[state=hidden]:fade-out',
    ),
    indicatorIcon:
      'relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-grey-line shadow-md',
    viewportWrapper: 'absolute left-0 top-full flex justify-center',
    viewport: clsx(
      'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-grey-line bg-grey-base shadow-md',
      'md:w-[var(--radix-navigation-menu-viewport-width)]',
      'data-[state=open]:animate-in data-[state=open]:zoom-in-90',
      'data-[state=closed]:animate-out data-[state=closed]:zoom-out-95',
    ),
  },
});

const {
  base,
  list,
  trigger,
  triggerIcon,
  content,
  indicator,
  indicatorIcon,
  viewportWrapper,
  viewport,
} = navigationMenuStyles();

export { trigger as navigationMenuTriggerStyle };

type NavigationMenuRef = React.ElementRef<typeof Root>;
type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * NavigationMenu component that serves as a container for navigation items.
 *
 * @param {NavigationMenuProps} props - The props for the NavigationMenu component.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink>Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 *
 * @see {@link https://dub.sh/ui-navigation-menu NavigationMenu Docs} for further information.
 */
export const NavigationMenu = forwardRef<
  NavigationMenuRef,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => (
  <Root ref={ref} className={base({ className })} {...props}>
    {children}
    <NavigationMenuViewport />
  </Root>
));

NavigationMenu.displayName = Root.displayName;

type NavigationMenuListRef = React.ElementRef<typeof List>;
type NavigationMenuListProps = React.ComponentPropsWithoutRef<typeof List>;

/**
 * NavigationMenuList component that displays a list of navigation items.
 *
 * @param {NavigationMenuListProps} props - The props for the NavigationMenuList component.
 *
 * @example
 * ```tsx
 * <NavigationMenuList>
 *   {Navigation items here}
 * </NavigationMenuList>
 * ```
 */
export const NavigationMenuList = forwardRef<
  NavigationMenuListRef,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <List ref={ref} className={list({ className })} {...props} />
));

NavigationMenuList.displayName = List.displayName;

/**
 * NavigationMenuItem component that represents an individual item in the navigation menu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Item>} props - The props for the NavigationMenuItem component.
 *
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 * </NavigationMenuItem>
 * ```
 */
export const NavigationMenuItem = Item;

type NavigationMenuTriggerRef = React.ElementRef<typeof Trigger>;
type NavigationMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof Trigger
>;

/**
 * NavigationMenuTrigger component that triggers the display of the navigation content.
 *
 * @param {NavigationMenuTriggerProps} props - The props for the NavigationMenuTrigger component.
 *
 * @example
 * ```tsx
 * <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 * ```
 */
export const NavigationMenuTrigger = forwardRef<
  NavigationMenuTriggerRef,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <Trigger ref={ref} className={trigger({ className })} {...props}>
    {children}
    <ChevronDownIcon className={triggerIcon()} />
  </Trigger>
));

NavigationMenuTrigger.displayName = Trigger.displayName;

type NavigationMenuContentRef = React.ElementRef<typeof Content>;
type NavigationMenuContentProps = React.ComponentPropsWithoutRef<
  typeof Content
>;

/**
 * NavigationMenuContent component that displays the content of a navigation item.
 *
 * @param {NavigationMenuContentProps} props - The props for the NavigationMenuContent component.
 *
 * @example
 * ```tsx
 * <NavigationMenuContent>
 *   <NavigationMenuLink>Link</NavigationMenuLink>
 * </NavigationMenuContent>
 * ```
 */
export const NavigationMenuContent = forwardRef<
  NavigationMenuContentRef,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <Content ref={ref} className={content({ className })} {...props} />
));

NavigationMenuContent.displayName = Content.displayName;

/**
 * NavigationMenuLink component that represents a link in the navigation menu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Link>} props - The props for the NavigationMenuLink component.
 *
 * @example
 * ```tsx
 * <NavigationMenuLink>Link</NavigationMenuLink>
 * ```
 */
export const NavigationMenuLink = Link;

type NavigationMenuIndicatorRef = React.ElementRef<typeof Indicator>;
type NavigationMenuIndicatorProps = React.ComponentPropsWithRef<
  typeof Indicator
>;

/**
 * NavigationMenuIndicator component that indicates the active navigation item.
 *
 * @param {NavigationMenuIndicatorProps} props - The props for the NavigationMenuIndicator component.
 *
 * @example
 * ```tsx
 * <NavigationMenuIndicator />
 * ```
 */
export const NavigationMenuIndicator = forwardRef<
  NavigationMenuIndicatorRef,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <Indicator ref={ref} className={indicator({ className })} {...props}>
    <div className={indicatorIcon()} />
  </Indicator>
));

NavigationMenuIndicator.displayName = Indicator.displayName;

type NavigationMenuViewportRef = React.ElementRef<typeof Viewport>;
type NavigationMenuViewportProps = React.ComponentPropsWithoutRef<
  typeof Viewport
>;

/**
 * NavigationMenuViewport component that defines the viewport for the navigation menu.
 *
 * @param {NavigationMenuViewportProps} props - The props for the NavigationMenuViewport component.
 *
 * @example
 * ```tsx
 * <NavigationMenuViewport />
 * ```
 */
export const NavigationMenuViewport = forwardRef<
  NavigationMenuViewportRef,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className={viewportWrapper()}>
    <Viewport ref={ref} className={viewport({ className })} {...props} />
  </div>
));

NavigationMenuViewport.displayName = Viewport.displayName;
