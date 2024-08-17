'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Indicator, Root } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const checkboxStyles = tv({
  base: cn(
    'group peer border border-grey-border bg-grey-base outline-none transition-colors duration-200',
    'hover:border-grey-border-hover',
    'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
    'disabled:cursor-not-allowed disabled:border-0 disabled:bg-grey-line',
    'data-[state=checked]:border-0 data-[state=checked]:bg-primary-solid',
    'data-[state=checked]:focus-visible:ring-primary-focus-ring',
    'data-[state=checked]:disabled:border-0 data-[state=checked]:disabled:bg-grey-line',
  ),
  variants: {
    shape: {
      square: 'rounded-md',
      round: 'rounded-full',
    },
    size: {
      small: 'h-4 w-4 p-[2px]',
      medium: 'h-[18px] w-[18px] p-[2px]',
    },
  },
  defaultVariants: {
    shape: 'square',
    size: 'small',
  },
});

type CheckboxRef = React.ElementRef<typeof Root>;
type CheckboxRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type CheckboxVariants = VariantProps<typeof checkboxStyles>;
type CheckboxProps = object & CheckboxRadixProps & CheckboxVariants;

/**
 * Checkbox component that allows users to select or deselect an option.
 *
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @param {'square' | 'round'} [shape='square'] - The shape of the checkbox.
 * @param {'small' | 'medium'} [size='small'] - The size of the checkbox.
 *
 * @example
 * <Checkbox />
 *
 * @see {@link https://dub.sh/ui-checkbox Checkbox Docs} for further information.
 */
export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ shape, size, className, ...props }, ref) => (
    <Root
      ref={ref}
      className={checkboxStyles({ shape, size, class: className })}
      {...props}
    >
      <Indicator className={cn('flex items-center justify-center')}>
        <CheckIcon className='h-full w-full text-grey-base group-disabled:text-grey-solid' />
      </Indicator>
    </Root>
  ),
);

Checkbox.displayName = Root.displayName;
