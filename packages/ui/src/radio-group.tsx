'use client';

import { forwardRef } from 'react';
import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@kosori/ui';

// --- Component:RadioGroup ---
type RadioGroupRef = React.ElementRef<typeof Root>;
type RadioGroupProps = React.ComponentPropsWithoutRef<typeof Root>;

export const RadioGroup = forwardRef<RadioGroupRef, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={cn('grid gap-2', className)} {...props} />
  ),
);

RadioGroup.displayName = Root.displayName;

// --- Component:RadioGroupItem ---
type RadioGroupItemRef = React.ElementRef<typeof Item>;
type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const RadioGroupItem = forwardRef<
  RadioGroupItemRef,
  RadioGroupItemProps
>(({ className, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      'group peer h-4 w-4 rounded-full border border-grey-border bg-grey-base outline-none transition-colors',
      'hover:border-grey-border-hover',
      'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
      'data-[state=checked]:border-primary-solid data-[state=checked]:bg-primary-solid',
      'disabled:cursor-not-allowed disabled:bg-grey-bg disabled:text-grey-solid',
      'disabled:hover:border-grey-border',
      className,
    )}
    {...props}
  >
    <Indicator className='flex items-center justify-center'>
      <Circle
        className={cn(
          'h-1.5 w-1.5 fill-grey-base stroke-grey-base',
          'group-disabled:fill-grey-bg',
        )}
      />
    </Indicator>
  </Item>
));

RadioGroupItem.displayName = Item.displayName;
