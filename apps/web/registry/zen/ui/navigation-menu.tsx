'use client';

import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import { IconChevronDown } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from 'motion/react';
import type * as React from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import { motionTokens, useControllableOpen } from '@/lib/motion';

const NavigationMenuOpenContext = createContext<boolean | null>(null);

/** Resolve a Navigation Menu's open state so its popup can exit before unmounting. */
export function NavigationMenu({
  align = 'start',
  className,
  children,
  defaultValue = null,
  onValueChange,
  value,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, 'align'>): React.ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const { open, setOpen } =
    useControllableOpen<NavigationMenuPrimitive.Root.ChangeEventDetails>({
      defaultOpen: defaultValue !== null,
      open: value === undefined ? undefined : value !== null,
    });
  const setValue = useCallback(
    (
      nextValue: NavigationMenuPrimitive.Root.Value<unknown>,
      details: NavigationMenuPrimitive.Root.ChangeEventDetails
    ) => {
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }
      setOpen(nextValue !== null, details);
      onValueChange?.(nextValue, details);
    },
    [onValueChange, setOpen, value]
  );

  return (
    <NavigationMenuOpenContext.Provider value={open}>
      <NavigationMenuPrimitive.Root
        className={cn(
          'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
          className
        )}
        data-slot='navigation-menu'
        onValueChange={setValue}
        value={value === undefined ? uncontrolledValue : value}
        {...props}
      >
        {children}
        <AnimatePresence>
          {open ? <NavigationMenuPositioner align={align} /> : null}
        </AnimatePresence>
      </NavigationMenuPrimitive.Root>
    </NavigationMenuOpenContext.Provider>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<
  typeof NavigationMenuPrimitive.List
>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-0',
        className
      )}
      data-slot='navigation-menu-list'
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<
  typeof NavigationMenuPrimitive.Item
>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Item
      className={cn('relative', className)}
      data-slot='navigation-menu-item'
      {...props}
    />
  );
}

export const navigationMenuTriggerStyle = cva(
  "flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 font-medium text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-popup-open:bg-accent data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
);

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      data-slot='navigation-menu-trigger'
      {...props}
    >
      {children}{' '}
      <IconChevronDown
        aria-hidden='true'
        className='ms-1 opacity-80 transition-transform duration-[var(--duration-fast,160ms)] ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] group-data-popup-open/navigation-menu-trigger:rotate-180 motion-reduce:transition-none'
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      className={cn('h-full w-auto p-1', className)}
      data-slot='navigation-menu-content'
      {...props}
    />
  );
}

export function NavigationMenuPositioner({
  className,
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props): React.ReactElement {
  const open = useContext(NavigationMenuOpenContext);
  const reduce = useReducedMotion();
  const transition = motionTokens.spring.snappy;
  const scale = reduce ? 1 : 0.98;

  return (
    <NavigationMenuPrimitive.Portal keepMounted={open !== null}>
      <NavigationMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)',
          className
        )}
        side={side}
        sideOffset={sideOffset}
        {...props}
      >
        <NavigationMenuPrimitive.Popup
          className='relative flex h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]'
          data-slot='navigation-menu-popup'
          render={
            open === null
              ? undefined
              : (elementProps, state) => (
                  <motion.div
                    {...(elementProps as HTMLMotionProps<'div'>)}
                    animate={{
                      opacity: state.open ? 1 : 0,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, scale }}
                    initial={{ opacity: 0, scale }}
                    transition={transition}
                  />
                )
          }
        >
          <NavigationMenuPrimitive.Viewport className='relative size-full overflow-hidden' />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

export function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        "flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-active:bg-accent data-active:text-accent-foreground sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='navigation-menu-link'
      {...props}
    />
  );
}

export function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<
  typeof NavigationMenuPrimitive.Icon
>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Icon
      className={cn(
        'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
        className
      )}
      data-slot='navigation-menu-indicator'
      {...props}
    >
      <div className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md/5' />
    </NavigationMenuPrimitive.Icon>
  );
}
