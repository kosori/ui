'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Indicator, Root } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const checkboxStyles = tv({
  slots: {
    base: clsx(
      'group peer flex border border-grey-border bg-grey-base outline-none transition-colors duration-200',
      'hover:border-grey-border-hover',
      'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'disabled:cursor-not-allowed disabled:border-0 disabled:bg-grey-line',
      'data-[state=checked]:border-0 data-[state=checked]:bg-primary-solid',
      'data-[state=checked]:focus-visible:ring-primary-focus-ring',
      'data-[state=checked]:disabled:border-0 data-[state=checked]:disabled:bg-grey-line',
    ),
    indicator: 'flex items-center justify-center',
    check: 'size-full text-grey-base group-disabled:text-grey-solid',
  },
  variants: {
    shape: {
      square: { base: 'rounded-md' },
      round: { base: 'rounded-full' },
    },
    size: {
      small: { base: 'size-4 p-0.5' },
      medium: { base: 'size-[18px] p-0.5' },
    },
  },
  defaultVariants: {
    shape: 'square',
    size: 'small',
  },
});

const { base, indicator, check } = checkboxStyles();

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
 * ```tsx
 * <Checkbox />
 * ```
 *
 * @see {@link https://dub.sh/ui-checkbox Checkbox Docs} for further information.
 */
export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ shape, size, className, ...props }, ref) => (
    <Root ref={ref} className={base({ className, shape, size })} {...props}>
      <Indicator className={indicator()}>
        <CheckIcon className={check()} />
      </Indicator>
    </Root>
  ),
);

Checkbox.displayName = Root.displayName;
