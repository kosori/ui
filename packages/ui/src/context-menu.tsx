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

/**
 * ContextMenu component that provides a context menu for user interactions.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the ContextMenu component.
 *
 * @example
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Profile</ContextMenuItem>
 *     <ContextMenuItem>Billing</ContextMenuItem>
 *     <ContextMenuItem>Team</ContextMenuItem>
 *     <ContextMenuItem>Subscription</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 *
 * @see {@link https://dub.sh/ui-context-menu Context Menu Docs} for further information.
 */
export const ContextMenu = Root;

/**
 * ContextMenuTrigger component that serves as the trigger for the ContextMenu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the ContextMenuTrigger component.
 *
 * @example
 * <ContextMenuTrigger>Right click</ContextMenuTrigger>
 */
export const ContextMenuTrigger = Trigger;

/**
 * ContextMenuPortal component that renders the ContextMenu in a portal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Portal>} props - The props for the ContextMenuPortal component.
 */
export const ContextMenuPortal = Portal;

type ContextMenuContentRef = React.ElementRef<typeof Content>;
type ContextMenuContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * ContextMenuContent component that wraps the content of the ContextMenu.
 *
 * @param {ContextMenuContentProps} props - The props for the ContextMenuContent component.
 *
 * @example
 * <ContextMenuContent>
 *   <ContextMenuItem>Profile</ContextMenuItem>
 * </ContextMenuContent>
 */
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

type ContextMenuItemRef = React.ElementRef<typeof Item>;
type ContextMenuItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

/**
 * ContextMenuItem component that represents a single item in the ContextMenu.
 *
 * @param {ContextMenuItemProps} props - The props for the ContextMenuItem component.
 * @param {boolean} [props.inset] - Whether the item is inset.
 *
 * @example
 * <ContextMenuItem>Profile</ContextMenuItem>
 */
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

/**
 * ContextMenuGroup component that groups related command items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Group>} props - The props for the ContextMenuGroup component.
 *
 * @example
 * <ContextMenuGroup>...</ContextMenuGroup>
 */
export const ContextMenuGroup = Group;

type ContextMenuLabelRef = React.ElementRef<typeof Label>;
type ContextMenuLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

/**
 * ContextMenuLabel component that displays a label for a group of items in the ContextMenu.
 *
 * @param {ContextMenuLabelProps} props - The props for the ContextMenuLabel component.
 * @param {boolean} [props.inset] - Whether the label is inset.
 *
 * @example
 * <ContextMenuLabel>Settings</ContextMenuLabel>
 */
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

type ContextMenuCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

/**
 * ContextMenuCheckboxItem component that represents a checkbox item in the ContextMenu.
 *
 * @param {ContextMenuCheckboxItemProps} props - The props for the ContextMenuCheckboxItem component.
 *
 * @example
 * <ContextMenuCheckboxItem checked={true}>Enable Notifications</ContextMenuCheckboxItem>
 */
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

/**
 * ContextMenuRadioGroup component that represents a group of radio items in the ContextMenu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroup>} props - The props for the ContextMenuRadioGroup component.
 *
 * @example
 * <ContextMenuRadioGroup>...</ContextMenuRadioGroup>
 */
export const ContextMenuRadioGroup = RadioGroup;

type ContextMenuRadioItemRef = React.ElementRef<typeof RadioItem>;
type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadioItem
>;

/**
 * ContextMenuRadioItem component that represents a radio item in the ContextMenu.
 *
 * @param {ContextMenuRadioItemProps} props - The props for the ContextMenuRadioItem component.
 *
 * @example
 * <ContextMenuRadioItem>Option 1</ContextMenuRadioItem>
 */
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

type ContextMenuSeparatorRef = React.ElementRef<typeof Separator>;
type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
>;

/**
 * ContextMenuSeparator component that visually separates items in the ContextMenu.
 *
 * @param {ContextMenuSeparatorProps} props - The props for the ContextMenuSeparator component.
 *
 * @example
 * <ContextMenuSeparator />
 */
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

/**
 * ContextMenuSub component that represents a sub-menu in the ContextMenu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Sub>} props - The props for the ContextMenuSub component.
 *
 * @example
 * <ContextMenuSub>...</ContextMenuSub>
 */
export const ContextMenuSub = Sub;

type ContextMenuSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

/**
 * ContextMenuSubTrigger component that serves as the trigger for a sub-menu in the ContextMenu.
 *
 * @param {ContextMenuSubTriggerProps} props - The props for the ContextMenuSubTrigger component.
 * @param {boolean} [props.inset] - Whether the trigger is inset.
 *
 * @example
 * <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
 */
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

type ContextMenuSubContentRef = React.ElementRef<typeof SubContent>;
type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof SubContent
>;

/**
 * ContextMenuSubContent component that wraps the content of a sub-menu in the ContextMenu.
 *
 * @param {ContextMenuSubContentProps} props - The props for the ContextMenuSubContent component.
 *
 * @example
 * <ContextMenuSubContent>...</ContextMenuSubContent>
 */
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

type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * ContextMenuShortcut component that displays a keyboard shortcut for a command item.
 *
 * @param {ContextMenuShortcutProps} props - The props for the ContextMenuShortcut component.
 *
 * @example
 * <ContextMenuShortcut>⌘K</ContextMenuShortcut>
 */
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

ContextMenuShortcut.displayName = 'ContextMenuShortcut';
