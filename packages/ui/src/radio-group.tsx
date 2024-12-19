'use client';

import { forwardRef } from 'react';
import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const radioGroupStyles = tv({
  slots: {
    base: 'grid gap-2',
    item: clsx(
      'group peer h-4 w-4 rounded-full border border-grey-border bg-grey-base outline-none transition-colors',
      'hover:border-grey-border-hover',
      'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
      'data-[state=checked]:border-primary-solid data-[state=checked]:bg-primary-solid',
      'disabled:cursor-not-allowed disabled:bg-grey-bg disabled:text-grey-solid',
      'disabled:hover:border-grey-border',
    ),
    itemIndicator: 'flex items-center justify-center',
    itemIndicatorIcon: clsx(
      'size-1.5 rounded-full bg-grey-base',
      'group-disabled:bg-grey-bg',
    ),
  },
});

const { base, item, itemIndicator, itemIndicatorIcon } = radioGroupStyles();

type RadioGroupRef = React.ElementRef<typeof Root>;
type RadioGroupProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * RadioGroup component that serves as a container for radio button items.
 *
 * @param {RadioGroupProps} props - The props for the RadioGroup component.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue='option-one'>
 *   <div className='flex items-center space-x-2'>
 *     <RadioGroupItem value='option-one' id='option-one' />
 *     <Label htmlFor='option-one'>Option One</Label>
 *   </div>
 *   <div className='flex items-center space-x-2'>
 *     <RadioGroupItem value='option-two' id='option-two' />
 *     <Label htmlFor='option-two'>Option Two</Label>
 *   </div>
 * </RadioGroup>
 * ```
 *
 * @see {@link https://dub.sh/ui-radio-group RadioGroup Docs} for further information.
 */
export const RadioGroup = forwardRef<RadioGroupRef, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props} />
  ),
);

RadioGroup.displayName = Root.displayName;

type RadioGroupItemRef = React.ElementRef<typeof Item>;
type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof Item>;

/**
 * RadioGroupItem component that represents an individual radio button in the group.
 *
 * @param {RadioGroupItemProps} props - The props for the RadioGroupItem component.
 *
 * @example
 * ```tsx
 * <RadioGroupItem value='option-one' id='option-one' />
 * ```
 */
export const RadioGroupItem = forwardRef<
  RadioGroupItemRef,
  RadioGroupItemProps
>(({ className, ...props }, ref) => (
  <Item ref={ref} className={item({ className })} {...props}>
    <Indicator className={itemIndicator()}>
      <div className={itemIndicatorIcon()} />
    </Indicator>
  </Item>
));

RadioGroupItem.displayName = Item.displayName;
