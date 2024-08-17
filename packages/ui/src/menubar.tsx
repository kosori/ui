import { forwardRef } from 'react';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-menubar';

import { cn } from '@kosori/ui';

type MenubarRef = React.ElementRef<typeof Root>;
type MenubarProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * Menubar component that serves as a container for the menu items.
 *
 * @param {MenubarProps} props - The props for the Menubar component.
 *
 * @example
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>
 *         New Tab <MenubarShortcut>⌘T</MenubarShortcut>
 *       </MenubarItem>
 *       <MenubarItem>New Window</MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>Share</MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>Print</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 *
 * @see {@link https://dub.sh/ui-menubar Menubar Docs} for further information.
 */
export const Menubar = forwardRef<MenubarRef, MenubarProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        'flex h-9 items-center space-x-1 rounded-lg border border-grey-line bg-grey-base p-1 shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);

Menubar.displayName = Root.displayName;

/**
 * MenubarMenu component that represents a menu within the menubar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Menu>} props - The props for the MenubarMenu component.
 *
 * @example
 * <MenubarMenu>
 *   <MenubarTrigger>File</MenubarTrigger>
 *   <MenubarContent>
 *     {Menu items here}
 *   </MenubarContent>
 * </MenubarMenu>
 */
export const MenubarMenu = Menu;

type MenubarTriggerRef = React.ElementRef<typeof Trigger>;
type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

/**
 * MenubarTrigger component that triggers the display of the menu content.
 *
 * @param {MenubarTriggerProps} props - The props for the MenubarTrigger component.
 *
 * @example
 * <MenubarTrigger>File</MenubarTrigger>
 */
export const MenubarTrigger = forwardRef<
  MenubarTriggerRef,
  MenubarTriggerProps
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'flex h-full select-none items-center rounded-md px-3 py-1 text-sm font-medium outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
      className,
    )}
    {...props}
  />
));

MenubarTrigger.displayName = Trigger.displayName;

/**
 * MenubarPortal component that renders the menu content in a portal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Portal>} props - The props for the MenubarPortal component.
 *
 * @example
 * <MenubarPortal>
 *   <MenubarContent>
 *     {Menu items here}
 *   <MenubarContent />
 * </MenubarPortal>
 */
export const MenubarPortal = Portal;

type MenubarContentRef = React.ElementRef<typeof Content>;
type MenubarContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * MenubarContent component that displays the content of the menu.
 *
 * @param {MenubarContentProps} props - The props for the MenubarContent component.
 *
 * @example
 * <MenubarContent>
 *   {Menu items here}
 * </MenubarContent>
 */
export const MenubarContent = forwardRef<
  MenubarContentRef,
  MenubarContentProps
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <Portal>
      <Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  ),
);

MenubarContent.displayName = Content.displayName;

type MenubarItemRef = React.ElementRef<typeof Item>;
type MenubarItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

/**
 * MenubarItem component that represents an individual item in the menu.
 *
 * @param {MenubarItemProps} props - The props for the MenubarItem component.
 * @param {boolean} [inset] - Whether to add an inset to the item.
 *
 * @example
 * <MenubarItem>New Tab</MenubarItem>
 */
export const MenubarItem = forwardRef<MenubarItemRef, MenubarItemProps>(
  ({ className, inset, ...props }, ref) => (
    <Item
      ref={ref}
      className={cn(
        'group relative flex select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-200',
        'focus:bg-primary-bg-hover',
        'active:bg-primary-bg-active',
        'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
);

MenubarItem.displayName = Item.displayName;

/**
 * MenubarGroup component that groups related menu items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Group>} props - The props for the MenubarGroup component.
 *
 * @example
 * <MenubarGroup>
 *   {Grouped menu items here}
 * </MenubarGroup>
 */
export const MenubarGroup = Group;

type MenubarLabelRef = React.ElementRef<typeof Label>;
type MenubarLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

/**
 * MenubarLabel component that provides a label for a group of menu items.
 *
 * @param {MenubarLabelProps} props - The props for the MenubarLabel component.
 * @param {boolean} [inset] - Whether to add an inset to the label.
 *
 * @example
 * <MenubarLabel>File</MenubarLabel>
 */
export const MenubarLabel = forwardRef<MenubarLabelRef, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn(
        'select-none px-2 py-1.5 text-xs font-medium text-grey-text',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
);

MenubarLabel.displayName = Label.displayName;

type MenubarCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

/**
 * MenubarCheckboxItem component that represents a checkbox item in the menu.
 *
 * @param {MenubarCheckboxItemProps} props - The props for the MenubarCheckboxItem component.
 *
 * @example
 * <MenubarCheckboxItem>Enable Feature</MenubarCheckboxItem>
 */
export const MenubarCheckboxItem = forwardRef<
  MenubarCheckboxItemRef,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'group relative flex select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-gg-hover',
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

MenubarCheckboxItem.displayName = CheckboxItem.displayName;

/**
 * MenubarRadioGroup component that groups radio items in the menu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroup>} props - The props for the MenubarRadioGroup component.
 *
 * @example
 * <MenubarRadioGroup>
 *   {Radio items here}
 * </MenubarRadioGroup>
 */
export const MenubarRadioGroup = RadioGroup;

type MenubarRadioItemRef = React.ElementRef<typeof RadioItem>;
type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof RadioItem>;

/**
 * MenubarRadioItem component that represents a radio item in the menu.
 *
 * @param {MenubarRadioItemProps} props - The props for the MenubarRadioItem component.
 *
 * @example
 * <MenubarRadioItem>Option 1</MenubarRadioItem>
 */
export const MenubarRadioItem = forwardRef<
  MenubarRadioItemRef,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      'relative flex select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
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

MenubarRadioItem.displayName = RadioItem.displayName;

type MenubarSeparatorRef = React.ElementRef<typeof Separator>;
type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

/**
 * MenubarSeparator component that visually separates menu items.
 *
 * @param {MenubarSeparatorProps} props - The props for the MenubarSeparator component.
 *
 * @example
 * <MenubarSeparator />
 */
export const MenubarSeparator = forwardRef<
  MenubarSeparatorRef,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-grey-line', className)}
    {...props}
  />
));

MenubarSeparator.displayName = Separator.displayName;

/**
 * MenubarSub component that represents a submenu in the menubar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Sub>} props - The props for the MenubarSub component.
 *
 * @example
 * <MenubarSub>
 *   {Submenu items here}
 * </MenubarSub>
 */
export const MenubarSub = Sub;

type MenubarSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

/**
 * MenubarSubTrigger component that triggers the display of a submenu.
 *
 * @param {MenubarSubTriggerProps} props - The props for the MenubarSubTrigger component.
 *
 * @example
 * <MenubarSubTrigger>More Options</MenubarSubTrigger>
 */
export const MenubarSubTrigger = forwardRef<
  MenubarSubTriggerRef,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      'flex select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
      'data-[disabled]:text-grey-solid',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ml-auto h-4 w-4' />
  </SubTrigger>
));

MenubarSubTrigger.displayName = SubTrigger.displayName;

type MenubarSubContentRef = React.ElementRef<typeof SubContent>;
type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof SubContent>;

/**
 * MenubarSubContent component that displays the content of a submenu.
 *
 * @param {MenubarSubContentProps} props - The props for the MenubarSubContent component.
 *
 * @example
 * <MenubarSubContent>
 *   {Submenu items here}
 * </MenubarSubContent>
 */
export const MenubarSubContent = forwardRef<
  MenubarSubContentRef,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));

MenubarSubContent.displayName = SubContent.displayName;

type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * MenubarShortcut component that displays a shortcut key for a menu item.
 *
 * @param {MenubarShortcutProps} props - The props for the MenubarShortcut component.
 *
 * @example
 * <MenubarShortcut>⌘T</MenubarShortcut>
 */
export const MenubarShortcut = ({
  className,
  ...props
}: MenubarShortcutProps) => (
  <span
    className={cn(
      'ml-auto text-xs tracking-widest text-grey-text',
      'group-data-[disabled]:text-grey-solid',
      className,
    )}
    {...props}
  />
);

MenubarShortcut.displayName = 'MenubarShortcut';
