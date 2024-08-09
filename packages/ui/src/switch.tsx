'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Root, Thumb } from '@radix-ui/react-switch';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const switchStyles = tv({
  base: cn(
    'peer box-border inline-flex cursor-pointer items-center rounded-full border-2 border-transparent outline-none transition-colors',
    'focus-visible:ring-4',
    'disabled:cursor-not-allowed disabled:!bg-grey-bg',
    'data-[state=unchecked]:bg-grey-line',
    'data-[state=checked]:bg-primary-solid',
    'data-[state=unchecked]:focus-visible:ring-grey-focus-ring',
    'data-[state=checked]:focus-visible:ring-primary-focus-ring',
  ),
  variants: {
    size: {
      small: cn(
        'h-4 w-7',
        '[&_span]:h-3 [&_span]:w-3',
        '[&_span]:data-[state=checked]:translate-x-[13px]',
      ),
      medium: cn(
        'h-5 w-9',
        '[&_span]:h-4 [&_span]:w-4',
        '[&_span]:data-[state=checked]:translate-x-4',
      ),
      big: cn(
        'h-6 w-11',
        '[&_span]:h-5 [&_span]:w-5',
        '[&_span]:data-[state=checked]:translate-x-5',
      ),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

// --- Component:Switch ---
type SwitchRef = React.ElementRef<typeof Root>;
type SwitchRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type SwitchVariants = VariantProps<typeof switchStyles>;
type SwitchProps = object & SwitchRadixProps & SwitchVariants;

export const Switch = forwardRef<SwitchRef, SwitchProps>(
  ({ size, className, ...props }, ref) => (
    <Root
      ref={ref}
      className={switchStyles({ size, class: className })}
      {...props}
    >
      <Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-grey-base shadow-lg transition-transform',
          'data-[state=unchecked]:translate-x-0',
        )}
      />
    </Root>
  ),
);

Switch.displayName = Root.displayName;
