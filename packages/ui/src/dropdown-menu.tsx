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

/**
 * DropdownMenu component that provides a dropdown menu for user interactions.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the DropdownMenu component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the DropdownMenu.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Billing</DropdownMenuItem>
 *     <DropdownMenuItem>Team</DropdownMenuItem>
 *     <DropdownMenuItem>Subscription</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * @see {@link https://dub.sh/ui-dropdown-menu Dropdown Menu Docs} for further information.
 */
export const DropdownMenu = Root;

export const DropdownMenuTrigger = Trigger;

export const DropdownMenuPortal = Portal;

type DropdownMenuContentRef = React.ElementRef<typeof Content>;
type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * DropdownMenuContent component that wraps the content of the DropdownMenu.
 *
 * @param {DropdownMenuContentProps} props - The props for the DropdownMenuContent component.
 *
 * @example
 * <DropdownMenuContent>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 * </DropdownMenuContent>
 */
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

type DropdownMenuItemRef = React.ElementRef<typeof Item>;
type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

/**
 * DropdownMenuItem component that represents a single item in the DropdownMenu.
 *
 * @param {DropdownMenuItemProps} props - The props for the DropdownMenuItem component.
 * @param {boolean} [props.inset] - Whether the item is inset.
 *
 * @example
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 */
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

type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * DropdownMenuShortcut component that displays a keyboard shortcut for a command item.
 *
 * @param {DropdownMenuShortcutProps} props - The props for the DropdownMenuShortcut component.
 *
 * @example
 * <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
 */
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

export const DropdownMenuGroup = Group;

type DropdownMenuLabelRef = React.ElementRef<typeof Label>;
type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

/**
 * DropdownMenuLabel component that displays a label for a group of items in the DropdownMenu.
 *
 * @param {DropdownMenuLabelProps} props - The props for the DropdownMenuLabel component.
 * @param {boolean} [props.inset] - Whether the label is inset.
 *
 * @example
 * <DropdownMenuLabel>Settings</DropdownMenuLabel>
 */
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

type DropdownMenuCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

/**
 * DropdownMenuCheckboxItem component that represents a checkbox item in the DropdownMenu.
 *
 * @param {DropdownMenuCheckboxItemProps} props - The props for the DropdownMenuCheckboxItem component.
 *
 * @example
 * <DropdownMenuCheckboxItem checked={true}>Enable Notifications</DropdownMenuCheckboxItem>
 */
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

export const DropdownMenuRadioGroup = RadioGroup;

type DropdownMenuRadioItemRef = React.ElementRef<typeof RadioItem>;
type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadioItem
>;

/**
 * DropdownMenuRadioItem component that represents a radio item in the DropdownMenu.
 *
 * @param {DropdownMenuRadioItemProps} props - The props for the DropdownMenuRadioItem component.
 *
 * @example
 * <DropdownMenuRadioItem>Option 1</DropdownMenuRadioItem>
 */
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

type DropdownMenuSeparatorRef = React.ElementRef<typeof Separator>;
type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
>;

/**
 * DropdownMenuSeparator component that visually separates items in the DropdownMenu.
 *
 * @param {DropdownMenuSeparatorProps} props - The props for the DropdownMenuSeparator component.
 *
 * @example
 * <DropdownMenuSeparator />
 */
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

export const DropdownMenuSub = Sub;

type DropdownMenuSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

/**
 * DropdownMenuSubTrigger component that serves as the trigger for a sub-menu in the DropdownMenu.
 *
 * @param {DropdownMenuSubTriggerProps} props - The props for the DropdownMenuSubTrigger component.
 * @param {boolean} [props.inset] - Whether the trigger is inset.
 *
 * @example
 * <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 */
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

type DropdownMenuSubContentRef = React.ElementRef<typeof SubContent>;
type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof SubContent
>;

/**
 * DropdownMenuSubContent component that wraps the content of a sub-menu in the DropdownMenu.
 *
 * @param {DropdownMenuSubContentProps} props - The props for the DropdownMenuSubContent component.
 *
 * @example
 * <DropdownMenuSubContent>...</DropdownMenuSubContent>
 */
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
