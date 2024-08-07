'use client';

import { forwardRef } from 'react';
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@kosori/ui';

// --- Component:DropdownMenu ---
export const DropdownMenu = Root;

// --- Component:DropdownMenuTrigger ---
export const DropdownMenuTrigger = Trigger;

// --- Component:DropdownMenuPortal ---
export const DropdownMenuPortal = Portal;

// --- Component:DropdownMenuContent ---
type DropdownMenuContentRef = React.ElementRef<typeof Content>;
type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const DropdownMenuContent = forwardRef<
  DropdownMenuContentRef,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
));

DropdownMenuContent.displayName = Content.displayName;

// --- Component:DropdownMenuItem ---
type DropdownMenuItemRef = React.ElementRef<typeof Item>;
type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

export const DropdownMenuItem = forwardRef<
  DropdownMenuItemRef,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      'group relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

DropdownMenuItem.displayName = Item.displayName;

// --- Component:DropdownMenuShortcut ---
type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => (
  <span
    className={cn(
      'ml-auto text-xs tracking-widest text-grey-text',
      'group-data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  />
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

// --- Component:DropdownMenuGroup ---
export const DropdownMenuGroup = Group;

// --- Component:DropdownMenuLabel ---
type DropdownMenuLabelRef = React.ElementRef<typeof Label>;
type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

export const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelRef,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(
      'flex select-none items-center px-2 py-1.5 text-xs font-medium text-grey-text',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

DropdownMenuLabel.displayName = Label.displayName;

// --- Component:DropdownMenuCheckboxItem ---
type DropdownMenuCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuCheckboxItemRef,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'group relative flex h-8 select-none items-center rounded-md pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex items-center justify-center'>
      <ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;

// --- Component:DropdownMenuRadioGroup ---
export const DropdownMenuRadioGroup = RadioGroup;

// --- Component:DropdownMenuRadioItem ---
type DropdownMenuRadioItemRef = React.ElementRef<typeof RadioItem>;
type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadioItem
>;

export const DropdownMenuRadioItem = forwardRef<
  DropdownMenuRadioItemRef,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      'group relative flex select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex items-center justify-center'>
      <ItemIndicator>
        <DotFilledIcon className='h-4 w-4 fill-current' />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));

DropdownMenuRadioItem.displayName = RadioItem.displayName;

// --- Component:DropdownMenuSeparator ---
type DropdownMenuSeparatorRef = React.ElementRef<typeof Separator>;
type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
>;

export const DropdownMenuSeparator = forwardRef<
  DropdownMenuSeparatorRef,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-grey-line', className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = Separator.displayName;

// --- Component:DropdownMenuSub ---
export const DropdownMenuSub = Sub;

// --- Component:DropdownMenuSubTrigger ---
type DropdownMenuSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

export const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerRef,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      'flex select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ml-auto h-4 w-4' />
  </SubTrigger>
));

DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

// --- Component:DropdownMenuSubContent ---
type DropdownMenuSubContentRef = React.ElementRef<typeof SubContent>;
type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof SubContent
>;

export const DropdownMenuSubContent = forwardRef<
  DropdownMenuSubContentRef,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      className,
    )}
    {...props}
  />
));

DropdownMenuSubContent.displayName = SubContent.displayName;
