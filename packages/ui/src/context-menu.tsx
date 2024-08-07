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
} from '@radix-ui/react-context-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@kosori/ui';

// --- Component:ContextMenu ---
export const ContextMenu = Root;

// --- Component:ContextMenuTrigger ---
export const ContextMenuTrigger = Trigger;

// --- Component:ContextMenuPortal ---
export const ContextMenuPortal = Portal;

// --- Component:ContextMenuContent ---
type ContextMenuContentRef = React.ElementRef<typeof Content>;
type ContextMenuContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const ContextMenuContent = forwardRef<
  ContextMenuContentRef,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-xl border border-grey-line bg-grey-base p-1 shadow-md',
        className,
      )}
      {...props}
    />
  </Portal>
));

ContextMenuContent.displayName = Content.displayName;

// --- Component:ContextMenuItem ---
type ContextMenuItemRef = React.ElementRef<typeof Item>;
type ContextMenuItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

export const ContextMenuItem = forwardRef<
  ContextMenuItemRef,
  ContextMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      'group relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

ContextMenuItem.displayName = Item.displayName;

// --- Component:ContextMenuGroup ---
export const ContextMenuGroup = Group;

// --- Component:ContextMenuLabel ---
type ContextMenuLabelRef = React.ElementRef<typeof Label>;
type ContextMenuLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

export const ContextMenuLabel = forwardRef<
  ContextMenuLabelRef,
  ContextMenuLabelProps
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

ContextMenuLabel.displayName = Label.displayName;

// --- Component:ContextMenuCheckboxItem ---
type ContextMenuCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

export const ContextMenuCheckboxItem = forwardRef<
  ContextMenuCheckboxItemRef,
  ContextMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'group relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
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

ContextMenuCheckboxItem.displayName = CheckboxItem.displayName;

// --- Component:ContextMenuRadioGroup ---
export const ContextMenuRadioGroup = RadioGroup;

// --- Component:ContextMenuRadioItem ---
type ContextMenuRadioItemRef = React.ElementRef<typeof RadioItem>;
type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadioItem
>;

export const ContextMenuRadioItem = forwardRef<
  ContextMenuRadioItemRef,
  ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <DotFilledIcon className='h-4 w-4 fill-current' />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));

ContextMenuRadioItem.displayName = RadioItem.displayName;

// --- Component:ContextMenuSeparator ---
type ContextMenuSeparatorRef = React.ElementRef<typeof Separator>;
type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
>;

export const ContextMenuSeparator = forwardRef<
  ContextMenuSeparatorRef,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('-mx-2 my-1 h-px bg-grey-line', className)}
    {...props}
  />
));

ContextMenuSeparator.displayName = Separator.displayName;

// --- Component:ContextMenuSub ---
export const ContextMenuSub = Sub;

// --- Component:ContextMenuSubTrigger ---
type ContextMenuSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

export const ContextMenuSubTrigger = forwardRef<
  ContextMenuSubTriggerRef,
  ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-200',
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

ContextMenuSubTrigger.displayName = SubTrigger.displayName;

// --- Component:ContextMenuSubContent ---
type ContextMenuSubContentRef = React.ElementRef<typeof SubContent>;
type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof SubContent
>;

export const ContextMenuSubContent = forwardRef<
  ContextMenuSubContentRef,
  ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-xl border border-grey-line bg-grey-base p-1 shadow-md',
      className,
    )}
    {...props}
  />
));

ContextMenuSubContent.displayName = SubContent.displayName;

// --- Component:ContextMenuShortcut ---
type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const ContextMenuShortcut = ({
  className,
  ...props
}: ContextMenuShortcutProps) => (
  <span
    className={cn(
      'ml-auto text-xs tracking-widest text-grey-text',
      'group-data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  />
);
