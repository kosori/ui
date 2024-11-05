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
import { clsx } from 'clsx';
import { tv } from 'tailwind-variants';

const dropdownMenuStyles = tv({
  slots: {
    content: clsx(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-grey-base p-1 shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=top]:slide-in-from-bottom-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
    ),
    item: clsx(
      'group relative flex h-8 cursor-pointer select-none items-center gap-2 rounded-md px-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      '[&>svg]:size-4 [&>svg]:shrink-0',
    ),
    label:
      'flex h-8 select-none items-center px-2 text-xs font-medium text-grey-text',
    checkboxItem: clsx(
      'group relative flex h-8 select-none items-center rounded-md pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    checkboxItemIndicator:
      'absolute left-2 flex size-3.5 items-center justify-center',
    checkboxItemIcon: 'size-4',
    radioItem: clsx(
      'group relative flex h-8 select-none items-center rounded-md pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    radioItemIndicator:
      'absolute left-2 flex size-3.5 items-center justify-center',
    radioItemIcon: 'size-4',
    separator: '-mx-1 my-1 h-px bg-grey-line',
    subTrigger: clsx(
      'group flex h-8 cursor-pointer select-none items-center rounded-md px-2 text-sm outline-none transition-colors',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    subTriggerIcon: clsx(
      'ml-auto size-4',
      'group-data-[disabled]:text-grey-solid',
    ),
    subContent: clsx(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=top]:slide-in-from-bottom-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
    ),
    shortcut: clsx(
      'ml-auto text-xs tracking-widest text-grey-text',
      'group-data-[disabled]:text-grey-solid',
    ),
  },
  variants: {
    inset: {
      true: {
        item: 'pl-8',
        label: 'pl-8',
        subTrigger: 'pl-8',
      },
    },
  },
});

const {
  content,
  item,
  label,
  checkboxItem,
  checkboxItemIndicator,
  checkboxItemIcon,
  radioItem,
  radioItemIndicator,
  radioItemIcon,
  separator,
  subTrigger,
  subTriggerIcon,
  subContent,
  shortcut,
} = dropdownMenuStyles();

/**
 * DropdownMenu component that provides a dropdown menu for user interactions.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the DropdownMenu component.
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
    className={content({ className })}
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
 * @param {boolean} [inset] - Whether the item is inset.
 *
 * @example
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 */
export const DropdownMenuItem = forwardRef<
  DropdownMenuItemRef,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <Item ref={ref} className={item({ className, inset })} {...props} />
));

DropdownMenuItem.displayName = Item.displayName;

export const DropdownMenuGroup = Group;

type DropdownMenuLabelRef = React.ElementRef<typeof Label>;
type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

/**
 * DropdownMenuLabel component that displays a label for a group of items in the DropdownMenu.
 *
 * @param {DropdownMenuLabelProps} props - The props for the DropdownMenuLabel component.
 * @param {boolean} [inset] - Whether the label is inset.
 *
 * @example
 * <DropdownMenuLabel>Settings</DropdownMenuLabel>
 */
export const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelRef,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <Label ref={ref} className={label({ className, inset })} {...props} />
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
    className={checkboxItem({ className })}
    {...props}
  >
    <span className={checkboxItemIndicator()}>
      <ItemIndicator>
        <CheckIcon className={checkboxItemIcon()} />
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
  <RadioItem ref={ref} className={radioItem({ className })} {...props}>
    <span className={radioItemIndicator()}>
      <ItemIndicator>
        <DotFilledIcon className={radioItemIcon()} />
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
  <Separator ref={ref} className={separator({ className })} {...props} />
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
 * @param {boolean} [inset] - Whether the trigger is inset.
 *
 * @example
 * <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 */
export const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerRef,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger ref={ref} className={subTrigger({ className, inset })} {...props}>
    {children}
    <ChevronRightIcon className={subTriggerIcon()} />
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
  <SubContent ref={ref} className={subContent({ className })} {...props} />
));

DropdownMenuSubContent.displayName = SubContent.displayName;

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
  <span className={shortcut({ className })} {...props} />
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
