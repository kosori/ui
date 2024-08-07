'use client';

import { forwardRef } from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';

import { cn } from '@kosori/ui';

// --- Component:Select ---
export const Select = Root;

// --- Component:SelectTrigger ---
type SelectTriggerRef = React.ElementRef<typeof Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

export const SelectTrigger = forwardRef<SelectTriggerRef, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={cn(
        'flex h-9 w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-lg border border-grey-border bg-grey-base px-3 py-2 text-sm shadow-sm outline-none transition-colors duration-200',
        'placeholder:text-grey-placeholder-text',
        'focus:ring-4 focus:ring-grey-focus-ring',
        'hover:border-grey-border-hover',
        'disabled:cursor-not-allowed disabled:bg-grey-bg disabled:text-grey-solid',
        '[&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}

      <Icon asChild>
        <CaretSortIcon className='h=4 w-4 fill-grey-text' />
      </Icon>
    </Trigger>
  ),
);

SelectTrigger.displayName = Trigger.displayName;

// --- Component:SelectValue ---
export const SelectValue = Value;

// --- Component:SelectContent ---
type SelectContentRef = React.ElementRef<typeof Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const SelectContent = forwardRef<SelectContentRef, SelectContentProps>(
  ({ className, children, position, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' && 'data-[side=bottom]:translate-y-1',
          position === 'popper' && 'data-[side=left]:-translate-x-1',
          position === 'popper' && 'data-[side=right]:translate-x-1',
          position === 'popper' && 'data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  ),
);

SelectContent.displayName = Content.displayName;

// --- Component:SelectItem ---
type SelectItemRef = React.ElementRef<typeof Item>;
type SelectItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const SelectItem = forwardRef<SelectItemRef, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
        'focus:bg-primary-bg-hover',
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

      <ItemText>{children}</ItemText>
    </Item>
  ),
);

SelectItem.displayName = Item.displayName;

// --- Component:SelectScrollUpButton ---
type SelectScrollUpButtonRef = React.ElementRef<typeof ScrollUpButton>;
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof ScrollUpButton
>;

export const SelectScrollUpButton = forwardRef<
  SelectScrollUpButtonRef,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </ScrollUpButton>
));

SelectScrollUpButton.displayName = ScrollUpButton.displayName;

// --- Component:SelectScrollDownButton ---
type SelectScrollDownButtonRef = React.ElementRef<typeof ScrollDownButton>;
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof ScrollDownButton
>;

export const SelectScrollDownButton = forwardRef<
  SelectScrollDownButtonRef,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </ScrollDownButton>
));

SelectScrollDownButton.displayName = ScrollDownButton.displayName;

// --- Component:SelectGroup ---
export const SelectGroup = Group;

// --- Component:SelectLabel ---
type SelectLabelRef = React.ElementRef<typeof Label>;
type SelectLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

export const SelectLabel = forwardRef<SelectLabelRef, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn(
        'flex select-none items-center py-1.5 pl-8 pr-2 text-xs font-medium text-grey-text',
        className,
      )}
      {...props}
    />
  ),
);

SelectLabel.displayName = Label.displayName;

// --- Component:SelectSeparator ---
type SelectSeparatorRef = React.ElementRef<typeof Separator>;
type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

export const SelectSeparator = forwardRef<
  SelectSeparatorRef,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-grey-line', className)}
    {...props}
  />
));

SelectSeparator.displayName = Separator.displayName;
