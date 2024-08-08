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

// --- Component:Menubar ---
type MenubarRef = React.ElementRef<typeof Root>;
type MenubarProps = React.ComponentPropsWithoutRef<typeof Root>;

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

// --- Component:MenubarMenu ---
export const MenubarMenu = Menu;

// --- Component:MenubarTrigger ---
type MenubarTriggerRef = React.ElementRef<typeof Trigger>;
type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

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

// --- Component:MenubarPortal ---
export const MenubarPortal = Portal;

// --- Component:MenubarContent ---
type MenubarContentRef = React.ElementRef<typeof Content>;
type MenubarContentProps = React.ComponentPropsWithoutRef<typeof Content>;

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

// --- Component:MenubarItem ---
type MenubarItemRef = React.ElementRef<typeof Item>;
type MenubarItemProps = React.ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
};

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

// --- Component:MenubarGroup ---
export const MenubarGroup = Group;

// --- Component:MenubarLabel ---
type MenubarLabelRef = React.ElementRef<typeof Label>;
type MenubarLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
};

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

// --- Component:MenubarCheckboxItem ---
type MenubarCheckboxItemRef = React.ElementRef<typeof CheckboxItem>;
type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof CheckboxItem
>;

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

// --- Component:MenubarRadioGroup ---
export const MenubarRadioGroup = RadioGroup;

// --- Component:MenubarRadioItem ---
type MenubarRadioItemRef = React.ElementRef<typeof RadioItem>;
type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof RadioItem>;

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

// --- Component:MenubarSeparator ---
type MenubarSeparatorRef = React.ElementRef<typeof Separator>;
type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

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

// --- Component:MenubarSub ---
export const MenubarSub = Sub;

// --- Component:MenubarSubTrigger ---
type MenubarSubTriggerRef = React.ElementRef<typeof SubTrigger>;
type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof SubTrigger
> & {
  inset?: boolean;
};

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

// --- Component:MenubarSubContent ---
type MenubarSubContentRef = React.ElementRef<typeof SubContent>;
type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof SubContent>;

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

// --- Component:MenubarShortcut ---
type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

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
