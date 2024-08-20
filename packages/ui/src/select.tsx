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
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const selectStyles = tv({
  slots: {
    trigger: clsx(
      'flex h-9 w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-lg border border-grey-border bg-grey-base px-3 py-2 text-sm shadow-sm outline-none transition-colors duration-200',
      'placeholder:text-grey-placeholder-text',
      'focus:ring-4 focus:ring-grey-focus-ring',
      'hover:border-grey-border-hover',
      'disabled:cursor-not-allowed disabled:bg-grey-bg disabled:text-grey-solid',
      '[&>span]:line-clamp-1',
    ),
    triggerIcon: 'size-4 fill-grey-text',
    content: clsx(
      'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-grey-line bg-grey-base shadow-md',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
    ),
    viewport: 'p-1',
    item: clsx(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-200',
      'focus:bg-primary-bg-hover',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    itemIndicator: 'absolute left-2 flex items-center justify-center',
    itemIcon: 'size-4',
    scrollUpButton: 'flex cursor-default items-center justify-center py-1',
    scrollDownButton: 'flex cursor-default items-center justify-center py-1',
    label:
      'flex select-none items-center py-1.5 pl-8 pr-2 text-xs font-medium text-grey-text',
    separator: '-mx-1 my-1 h-px bg-grey-line',
  },
  variants: {
    position: {
      popper: {
        content: clsx(
          'data-[side=bottom]:translate-y-1',
          'data-[side=left]:-translate-x-1',
          'data-[side=right]:translate-x-1',
          'data-[side=top]:-translate-y-1',
        ),
        viewport:
          'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
      },
      'item-aligned': '',
    },
  },
});

const {
  trigger,
  triggerIcon,
  content,
  viewport,
  item,
  itemIndicator,
  itemIcon,
  scrollUpButton,
  scrollDownButton,
  label,
  separator,
} = selectStyles();

/**
 * Select component that serves as a container for selectable items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Select component.
 *
 * @example
 * <Select>
 *   <SelectTrigger className='w-[180px]'>
 *     <SelectValue placeholder='Theme' />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value='light'>Light</SelectItem>
 *     <SelectItem value='dark'>Dark</SelectItem>
 *     <SelectItem value='system'>System</SelectItem>
 *   </SelectContent>
 * </Select>
 *
 * @see {@link https://dub.sh/ui-select Select Docs} for further information.
 */
export const Select = Root;

type SelectTriggerRef = React.ElementRef<typeof Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

/**
 * SelectTrigger component that triggers the display of the select options.
 *
 * @param {SelectTriggerProps} props - The props for the SelectTrigger component.
 *
 * @example
 * <SelectTrigger className='w-[180px]'>Select an option</SelectTrigger>
 */
export const SelectTrigger = forwardRef<SelectTriggerRef, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <Trigger ref={ref} className={trigger({ className })} {...props}>
      {children}

      <Icon asChild>
        <CaretSortIcon className={triggerIcon()} />
      </Icon>
    </Trigger>
  ),
);

SelectTrigger.displayName = Trigger.displayName;

/**
 * SelectValue component that displays the currently selected value.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Value>} props - The props for the SelectValue component.
 *
 * @example
 * <SelectValue placeholder='Select an option' />
 */
export const SelectValue = Value;

type SelectContentRef = React.ElementRef<typeof Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * SelectContent component that displays the selectable options.
 *
 * @param {SelectContentProps} props - The props for the SelectContent component.
 *
 * @example
 * <SelectContent>
 *   <SelectItem value='light'>Light</SelectItem>
 *   <SelectItem value='dark'>Dark</SelectItem>
 * </SelectContent>
 */
export const SelectContent = forwardRef<SelectContentRef, SelectContentProps>(
  ({ className, children, position, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        className={content({ className, position })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport className={viewport({ position })}>{children}</Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  ),
);

SelectContent.displayName = Content.displayName;

type SelectItemRef = React.ElementRef<typeof Item>;
type SelectItemProps = React.ComponentPropsWithoutRef<typeof Item>;

/**
 * SelectItem component that represents an individual option in the select.
 *
 * @param {SelectItemProps} props - The props for the SelectItem component.
 *
 * @example
 * <SelectItem value='light'>Light</SelectItem>
 */
export const SelectItem = forwardRef<SelectItemRef, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <Item ref={ref} className={item({ className })} {...props}>
      <span className={itemIndicator()}>
        <ItemIndicator>
          <CheckIcon className={itemIcon()} />
        </ItemIndicator>
      </span>

      <ItemText>{children}</ItemText>
    </Item>
  ),
);

SelectItem.displayName = Item.displayName;

type SelectScrollUpButtonRef = React.ElementRef<typeof ScrollUpButton>;
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof ScrollUpButton
>;

/**
 * SelectScrollUpButton component that allows scrolling up in the select options.
 *
 * @param {SelectScrollUpButtonProps} props - The props for the SelectScrollUpButton component.
 *
 * @example
 * <SelectScrollUpButton />
 */
export const SelectScrollUpButton = forwardRef<
  SelectScrollUpButtonRef,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={scrollUpButton({ className })}
    {...props}
  >
    <ChevronUpIcon />
  </ScrollUpButton>
));

SelectScrollUpButton.displayName = ScrollUpButton.displayName;

type SelectScrollDownButtonRef = React.ElementRef<typeof ScrollDownButton>;
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof ScrollDownButton
>;

/**
 * SelectScrollDownButton component that allows scrolling down in the select options.
 *
 * @param {SelectScrollDownButtonProps} props - The props for the SelectScrollDownButton component.
 *
 * @example
 * <SelectScrollDownButton />
 */
export const SelectScrollDownButton = forwardRef<
  SelectScrollDownButtonRef,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={scrollDownButton({ className })}
    {...props}
  >
    <ChevronDownIcon />
  </ScrollDownButton>
));

SelectScrollDownButton.displayName = ScrollDownButton.displayName;

/**
 * SelectGroup component that groups related select items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Group>} props - The props for the SelectGroup component.
 *
 * @example
 * <SelectGroup>
 *   <SelectItem value='light'>Light</SelectItem>
 * </SelectGroup>
 */
export const SelectGroup = Group;

type SelectLabelRef = React.ElementRef<typeof Label>;
type SelectLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

/**
 * SelectLabel component that provides a label for the select group.
 *
 * @param {SelectLabelProps} props - The props for the SelectLabel component.
 *
 * @example
 * <SelectLabel>Choose a theme</SelectLabel>
 */
export const SelectLabel = forwardRef<SelectLabelRef, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <Label ref={ref} className={label({ className })} {...props} />
  ),
);

SelectLabel.displayName = Label.displayName;

type SelectSeparatorRef = React.ElementRef<typeof Separator>;
type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

/**
 * SelectSeparator component that visually separates items in the select.
 *
 * @param {SelectSeparatorProps} props - The props for the SelectSeparator component.
 *
 * @example
 * <SelectSeparator />
 */
export const SelectSeparator = forwardRef<
  SelectSeparatorRef,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={separator({ className })} {...props} />
));

SelectSeparator.displayName = Separator.displayName;
