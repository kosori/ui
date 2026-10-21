import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import { IconChevronDown } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type * as React from 'react';

export function NavigationMenu({
  align = 'start',
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, 'align'>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className
      )}
      data-slot='navigation-menu'
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
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
        className='ms-1 opacity-80 group-data-popup-open/navigation-menu-trigger:rotate-180'
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
  return (
    <NavigationMenuPrimitive.Portal>
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
        <NavigationMenuPrimitive.Popup className='relative flex h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]'>
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
