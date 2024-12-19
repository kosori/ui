'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Root, Thumb } from '@radix-ui/react-switch';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const switchStyles = tv({
  slots: {
    base: clsx(
      'peer box-border inline-flex cursor-pointer items-center rounded-full border-2 border-transparent outline-none transition-colors',
      'focus-visible:ring-4',
      'disabled:cursor-not-allowed disabled:!bg-grey-bg',
      'data-[state=unchecked]:bg-grey-line',
      'data-[state=checked]:bg-primary-solid',
      'data-[state=unchecked]:focus-visible:ring-grey-focus-ring',
      'data-[state=checked]:focus-visible:ring-primary-focus-ring',
    ),
    thumb: clsx(
      'pointer-events-none block rounded-full bg-grey-base shadow-lg transition-transform',
      'data-[state=unchecked]:translate-x-0',
    ),
  },
  variants: {
    size: {
      small: {
        base: 'h-4 w-7',
        thumb: clsx('size-3', 'data-[state=checked]:translate-x-[13px]'),
      },
      medium: {
        base: 'h-5 w-9',
        thumb: clsx('size-4', 'data-[state=checked]:translate-x-4'),
      },
      large: {
        base: 'h-6 w-11',
        thumb: clsx('size-5', 'data-[state=checked]:translate-x-5'),
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const { base, thumb } = switchStyles();

type SwitchRef = React.ElementRef<typeof Root>;
type SwitchRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type SwitchVariants = VariantProps<typeof switchStyles>;
type SwitchProps = object & SwitchRadixProps & SwitchVariants;

/**
 * Switch component that allows users to toggle between checked and unchecked states.
 *
 * @param {SwitchProps} props - The props for the Switch component.
 * @param {string} [size='medium'] - The size of the switch (e.g. 'small', 'medium', 'large').
 *
 * @example
 * ```tsx
 * <Switch />
 * ```
 *
 * @see {@link https://dub.sh/ui-switch Switch Docs} for further information.
 */
export const Switch = forwardRef<SwitchRef, SwitchProps>(
  ({ size, className, ...props }, ref) => (
    <Root ref={ref} className={base({ className, size })} {...props}>
      <Thumb className={thumb({ size })} />
    </Root>
  ),
);

Switch.displayName = Root.displayName;
