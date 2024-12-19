import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-toggle';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

export const toggleStyles = tv({
  base: clsx(
    'inline-flex items-center justify-center font-medium outline-none transition-colors duration-200',
    'focus-visible:ring-4',
    'disabled:cursor-not-allowed',
  ),
  variants: {
    variant: {
      ghost: clsx(
        'hover:bg-grey-bg-hover',
        'active:bg-grey-bg-active',
        'data-[state=on]:bg-grey-bg-active',
        'focus-visible:ring-grey-focus-ring',
        'disabled:text-grey-solid',
        'disabled:hover:bg-transparent',
      ),
      outline: clsx(
        'border border-grey-border',
        'hover:border-grey-border-hover hover:bg-grey-bg-hover',
        'hover:border-grey-border-hover active:bg-grey-bg-active',
        'data-[state=on]:border-grey-border-hover data-[state=on]:bg-grey-bg-active',
        'focus-visible:ring-grey-focus-ring',
        'disabled:border-grey-line disabled:bg-grey-bg disabled:text-grey-solid',
      ),
    },
    size: {
      small: clsx('h-8 gap-x-1.5 rounded-lg px-2 text-xs', '[&_svg]:size-3.5'),
      medium: clsx('h-9 gap-x-2 rounded-lg px-3 text-sm', '[&_svg]:size-4'),
      large: clsx('h-10 gap-x-2.5 rounded-xl px-3 text-md', '[_&svg]:size-5'),
    },
    icon: {
      true: '',
    },
  },
  compoundVariants: [
    {
      size: 'small',
      icon: true,
      class: 'w-8 px-0',
    },
    {
      size: 'medium',
      icon: true,
      class: 'w-9 px-0',
    },
    {
      size: 'large',
      icon: true,
      class: 'w-10 px-0',
    },
  ],
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
 * @param {'ghost' | 'outline'} [variant='ghost'] - The variant style of the toggle (e.g. 'ghost', 'outline').
 * @param {'small' | 'medium' | 'large'} [size='medium'] - The size of the toggle (e.g. 'small', 'medium', 'large').
 * @param {boolean} [icon=false] - If true, adjusts the button size for icon-only usage.
 *
 * @example
 * ```tsx
 * <Toggle>Toggle</Toggle>
 * ```
 *
 * @see {@link https://dub.sh/ui-toggle Toggle Docs} for further information.
 */
export const Toggle = forwardRef<ToggleRef, ToggleProps>(
  ({ className, variant, size, icon, ...props }, ref) => (
    <Root
      ref={ref}
      className={toggleStyles({ className, size, variant, icon })}
      {...props}
    />
  ),
);

Toggle.displayName = Root.displayName;
