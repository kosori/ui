import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-toggle';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

export const toggleStyles = tv({
  base: cn(
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium outline-none transition-colors duration-200',
    'focus-visible:ring-4',
    'disabled:cursor-not-allowed',
  ),
  variants: {
    variant: {
      ghost: cn(
        'hover:bg-grey-bg-hover',
        'active:bg-grey-bg-active',
        'data-[state=on]:bg-grey-bg-active',
        'focus-visible:ring-grey-focus-ring',
        'disabled:text-grey-solid',
        'disabled:hover:bg-transparent',
      ),
      outline: cn(
        'border border-grey-border',
        'hover:border-grey-border-hover hover:bg-grey-bg-hover',
        'hover:border-grey-border-hover active:bg-grey-bg-active',
        'data-[state=on]:border-grey-border-hover data-[state=on]:bg-grey-bg-active',
        'focus-visible:ring-grey-focus-ring',
        'disabled:border-grey-line disabled:bg-grey-bg disabled:text-grey-solid',
      ),
    },
    size: {
      small: 'h-8 px-2',
      medium: 'h-9 px-3',
      large: 'h-10 px-3',
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'medium',
  },
});

type ToggleRef = React.ElementRef<typeof Root>;
type ToggleRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
export type ToggleVariants = VariantProps<typeof toggleStyles>;
type ToggleProps = object & ToggleRadixProps & ToggleVariants;

/**
 * Toggle component that allows users to switch between on and off states.
 *
 * @param {ToggleProps} props - The props for the Toggle component.
 * @param {'ghost' | 'outline'} [variant] - The variant style of the toggle (e.g. 'ghost', 'outline').
 * @param {'small' | 'medium' | 'large'} [size] - The size of the toggle (e.g. 'small', 'medium', 'large').
 *
 * @example
 * <Toggle>Toggle</Toggle>
 *
 * @see {@link https://dub.sh/ui-toggle Toggle Docs} for further information.
 */
export const Toggle = forwardRef<ToggleRef, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(toggleStyles({ variant, size, className }))}
      {...props}
    />
  ),
);

Toggle.displayName = Root.displayName;
