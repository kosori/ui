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
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const menubarStyles = tv({
  slots: {
    base: 'flex h-9 items-center space-x-1 rounded-lg border border-grey-line bg-grey-base p-1 shadow-sm',
    trigger: clsx(
      'flex h-full select-none items-center rounded-md px-3 py-1 text-sm font-medium outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
    ),
    content: clsx(
      'z-50 min-w-48 overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
    ),
    item: clsx(
      'group relative flex h-8 cursor-pointer select-none items-center rounded-md px-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    label:
      'flex h-8 select-none items-center px-2 text-xs font-medium text-grey-text',
    checkboxItem: clsx(
      'group relative flex h-8 cursor-pointer select-none items-center rounded-md pl-8 pr-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    checkboxItemIndicator: 'absolute left-2 flex items-center justify-center',
    checkboxItemIcon: 'size-4',
    radioItem: clsx(
      'relative flex h-8 cursor-pointer select-none items-center rounded-md pl-8 pr-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    radioItemIndicator: 'absolute left-2 flex items-center justify-center',
    radioItemIcon: 'size-4',
    separator: '-mx-1 my-1 h-px bg-grey-line',
    subTrigger: clsx(
      'group flex h-8 cursor-pointer select-none items-center rounded-md px-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'data-[state=open]:bg-primary-bg-hover',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    subTriggerIcon: clsx(
      'ml-auto size-4',
      'group-data-[disabled]:text-grey-solid',
    ),
    subContent: clsx(
      'z-50 min-w-32 overflow-hidden rounded-lg border border-grey-line bg-grey-base p-1 shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
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
  base,
  trigger,
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
} = menubarStyles();

type MenubarRef = React.ElementRef<typeof Root>;
type MenubarProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * Menubar component that serves as a container for the menu items.
 *
 * @param {MenubarProps} props - The props for the Menubar component.
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @see {@link https://dub.sh/ui-menubar Menubar Docs} for further information.
 */
export const Menubar = forwardRef<MenubarRef, MenubarProps>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props} />
  ),
);

Menubar.displayName = Root.displayName;

/**
 * MenubarMenu component that represents a menu within the menubar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Menu>} props - The props for the MenubarMenu component.
 *
 * @example
 * ```tsx
 * <MenubarMenu>
 *   <MenubarTrigger>File</MenubarTrigger>
 *   <MenubarContent>
 *     {Menu items here}
 *   </MenubarContent>
 * </MenubarMenu>
 * ```
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
 * ```tsx
 * <MenubarTrigger>File</MenubarTrigger>
 * ```
 */
export const MenubarTrigger = forwardRef<
  MenubarTriggerRef,
  MenubarTriggerProps
>(({ className, ...props }, ref) => (
  <Trigger ref={ref} className={trigger({ className })} {...props} />
));

MenubarTrigger.displayName = Trigger.displayName;

/**
 * MenubarPortal component that renders the menu content in a portal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Portal>} props - The props for the MenubarPortal component.
 *
 * @example
 * ```tsx
 * <MenubarPortal>
 *   <MenubarContent>
 *     {Menu items here}
 *   <MenubarContent />
 * </MenubarPortal>
 * ```
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
 * ```tsx
 * <MenubarContent>
 *   {Menu items here}
 * </MenubarContent>
 * ```
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
        className={content({ className })}
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
 * ```tsx
 * <MenubarItem>New Tab</MenubarItem>
 * ```
 */
export const MenubarItem = forwardRef<MenubarItemRef, MenubarItemProps>(
  ({ className, inset, ...props }, ref) => (
    <Item ref={ref} className={item({ className, inset })} {...props} />
  ),
);

MenubarItem.displayName = Item.displayName;

/**
 * MenubarGroup component that groups related menu items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Group>} props - The props for the MenubarGroup component.
 *
 * @example
 * ```tsx
 * <MenubarGroup>
 *   {Grouped menu items here}
 * </MenubarGroup>
 * ```
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
 * ```tsx
 * <MenubarLabel>File</MenubarLabel>
 * ```
 */
export const MenubarLabel = forwardRef<MenubarLabelRef, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <Label ref={ref} className={label({ className, inset })} {...props} />
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
 * ```tsx
 * <MenubarCheckboxItem>Enable Feature</MenubarCheckboxItem>
 * ```
 */
export const MenubarCheckboxItem = forwardRef<
  MenubarCheckboxItemRef,
  MenubarCheckboxItemProps
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

MenubarCheckboxItem.displayName = CheckboxItem.displayName;

/**
 * MenubarRadioGroup component that groups radio items in the menu.
 *
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroup>} props - The props for the MenubarRadioGroup component.
 *
 * @example
 * ```tsx
 * <MenubarRadioGroup>
 *   {Radio items here}
 * </MenubarRadioGroup>
 * ```
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
 * ```tsx
 * <MenubarRadioItem>Option 1</MenubarRadioItem>
 * ```
 */
export const MenubarRadioItem = forwardRef<
  MenubarRadioItemRef,
  MenubarRadioItemProps
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

MenubarRadioItem.displayName = RadioItem.displayName;

type MenubarSeparatorRef = React.ElementRef<typeof Separator>;
type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

/**
 * MenubarSeparator component that visually separates menu items.
 *
 * @param {MenubarSeparatorProps} props - The props for the MenubarSeparator component.
 *
 * @example
 * ```tsx
 * <MenubarSeparator />
 * ```
 */
export const MenubarSeparator = forwardRef<
  MenubarSeparatorRef,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={separator({ className })} {...props} />
));

MenubarSeparator.displayName = Separator.displayName;

/**
 * MenubarSub component that represents a submenu in the menubar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Sub>} props - The props for the MenubarSub component.
 *
 * @example
 * ```tsx
 * <MenubarSub>
 *   {Submenu items here}
 * </MenubarSub>
 * ```
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
 * ```tsx
 * <MenubarSubTrigger>More Options</MenubarSubTrigger>
 * ```
 */
export const MenubarSubTrigger = forwardRef<
  MenubarSubTriggerRef,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger ref={ref} className={subTrigger({ className, inset })} {...props}>
    {children}
    <ChevronRightIcon className={subTriggerIcon()} />
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
 * ```tsx
 * <MenubarSubContent>
 *   {Submenu items here}
 * </MenubarSubContent>
 * ```
 */
export const MenubarSubContent = forwardRef<
  MenubarSubContentRef,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <SubContent ref={ref} className={subContent({ className })} {...props} />
));

MenubarSubContent.displayName = SubContent.displayName;

type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * MenubarShortcut component that displays a shortcut key for a menu item.
 *
 * @param {MenubarShortcutProps} props - The props for the MenubarShortcut component.
 *
 * @example
 * ```tsx
 * <MenubarShortcut>⌘T</MenubarShortcut>
 * ```
 */
export const MenubarShortcut = ({
  className,
  ...props
}: MenubarShortcutProps) => (
  <span className={shortcut({ className })} {...props} />
);

MenubarShortcut.displayName = 'MenubarShortcut';
