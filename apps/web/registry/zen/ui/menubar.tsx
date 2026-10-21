'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { IconCheck } from '@tabler/icons-react';
import { cn } from 'cn';
import type * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Menubar({
  className,
  ...props
}: MenubarPrimitive.Props): React.ReactElement {
  return (
    <MenubarPrimitive
      className={cn(
        'relative flex items-center gap-1 rounded-lg border bg-popover not-dark:bg-clip-padding p-1 text-popover-foreground shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot='menubar'
      {...props}
    />
  );
}

export function MenubarMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenu>): React.ReactElement {
  return <DropdownMenu data-slot='menubar-menu' {...props} />;
}

export function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>): React.ReactElement {
  return <DropdownMenuGroup data-slot='menubar-group' {...props} />;
}

export function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>): React.ReactElement {
  return <DropdownMenuPortal data-slot='menubar-portal' {...props} />;
}

export function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>): React.ReactElement {
  return (
    <DropdownMenuTrigger
      className={cn(
        "flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 font-medium text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-popup-open:bg-accent data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='menubar-trigger'
      {...props}
    />
  );
}

export function MenubarContent({
  className,
  align = 'start',
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>): React.ReactElement {
  return (
    <DropdownMenuContent
      align={align}
      className={className}
      data-slot='menubar-content'
      {...props}
    />
  );
}

export function MenubarItem({
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>): React.ReactElement {
  return <DropdownMenuItem data-slot='menubar-item' {...props} />;
}

export function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "grid min-h-8 cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        'grid-cols-[.75rem_1fr] pe-4',
        className
      )}
      data-inset={inset}
      data-slot='menubar-checkbox-item'
      {...props}
    >
      <MenuPrimitive.CheckboxItemIndicator className='col-start-1 -ms-0.5'>
        <IconCheck aria-hidden='true' />
      </MenuPrimitive.CheckboxItemIndicator>
      <span className='col-start-2'>{children}</span>
    </MenuPrimitive.CheckboxItem>
  );
}

export function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>): React.ReactElement {
  return <DropdownMenuRadioGroup data-slot='menubar-radio-group' {...props} />;
}

export function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        "grid min-h-8 cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        'grid-cols-[.75rem_1fr] pe-4',
        className
      )}
      data-inset={inset}
      data-slot='menubar-radio-item'
      {...props}
    >
      <MenuPrimitive.RadioItemIndicator className='col-start-1 -ms-0.5'>
        <IconCheck aria-hidden='true' />
      </MenuPrimitive.RadioItemIndicator>
      <span className='col-start-2'>{children}</span>
    </MenuPrimitive.RadioItem>
  );
}

export function MenubarLabel({
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>): React.ReactElement {
  return <DropdownMenuLabel data-slot='menubar-label' {...props} />;
}

export function MenubarSeparator({
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>): React.ReactElement {
  return <DropdownMenuSeparator data-slot='menubar-separator' {...props} />;
}

export function MenubarShortcut({
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>): React.ReactElement {
  return <DropdownMenuShortcut data-slot='menubar-shortcut' {...props} />;
}

export function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>): React.ReactElement {
  return <DropdownMenuSub data-slot='menubar-sub' {...props} />;
}

export function MenubarSubTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>): React.ReactElement {
  return <DropdownMenuSubTrigger data-slot='menubar-sub-trigger' {...props} />;
}

export function MenubarSubContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>): React.ReactElement {
  return <DropdownMenuSubContent data-slot='menubar-sub-content' {...props} />;
}
