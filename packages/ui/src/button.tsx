import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

export const buttonStyles = tv({
  base: cn(
    'flex h-fit w-fit items-center justify-center font-semibold outline-none transition-colors duration-200',
    'focus-visible:ring-4',
    'disabled:cursor-not-allowed',
  ),
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: '',
      ghost: '',
    },
    intent: {
      default: '',
      danger: '',
    },
    size: {
      small: cn(
        'h-8 gap-x-1.5 rounded-lg px-2.5 text-xs leading-4',
        '[&_svg]:h-3.5 [&_svg]:w-3.5',
      ),
      medium: cn(
        'h-9 gap-x-2 rounded-lg px-3 text-sm',
        '[&_svg]:h-[18px] [&_svg]:w-[18px]',
      ),
      large: cn(
        'text-md h-10 gap-x-2.5 rounded-xl px-4',
        '[&_svg]:h-5 [&_svg]:w-5',
      ),
    },
    icon: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      intent: 'default',
      class: cn(
        'bg-primary-solid text-grey-base',
        'hover:bg-primary-solid-hover',
        'focus-visible:ring-primary-focus-ring',
        'disabled:bg-primary-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'default',
      class: cn(
        'border border-primary-border bg-primary-bg text-primary-solid',
        'hover:border-primary-border-hover hover:bg-primary-bg-hover',
        'active:bg-primary-bg-active',
        'focus-visible:ring-primary-focus-ring',
        'disabled:border-primary-line disabled:bg-primary-bg-subtle disabled:text-primary-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'default',
      class: cn(
        'border border-grey-border bg-grey-base text-grey-text-contrast',
        'hover:border-grey-border-hover hover:bg-grey-bg-subtle',
        'active:bg-grey-bg',
        'focus-visible:ring-grey-focus-ring',
        'disabled:border-grey-line disabled:bg-grey-base disabled:text-grey-solid',
      ),
    },
    {
      variant: 'ghost',
      intent: 'default',
      class: cn(
        'text-grey-text-contrast',
        'hover:bg-grey-bg-hover',
        'active:bg-grey-bg-active',
        'focus-visible:ring-grey-focus-ring',
        'disabled:bg-transparent disabled:text-grey-solid',
      ),
    },
    {
      variant: 'solid',
      intent: 'danger',
      class: cn(
        'bg-danger-solid text-white',
        'hover:bg-danger-solid-hover',
        'focus-visible:ring-danger-focus-ring',
        'disabled:bg-danger-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'danger',
      class: cn(
        'border border-danger-border bg-danger-bg text-danger-solid',
        'hover:border-danger-border-hover hover:bg-danger-bg-hover',
        'active:bg-danger-bg-active',
        'focus-visible:ring-danger-focus-ring',
        'disabled:border-danger-line disabled:bg-danger-bg-subtle disabled:text-danger-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'danger',
      class: cn(
        'border border-danger-border bg-danger-base text-danger-solid',
        'hover:border-danger-border-hover hover:bg-danger-bg-subtle',
        'active:bg-danger-bg',
        'focus-visible:ring-danger-focus-ring',
        'disabled:border-danger-line disabled:bg-danger-base disabled:text-danger-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'danger',
      class: cn(
        'text-danger-solid',
        'hover:bg-danger-bg',
        'active:bg-danger-bg-hover',
        'focus-visible:ring-danger-focus-ring',
        'disabled:bg-transparent disabled:text-danger-line',
      ),
    },
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
    variant: 'solid',
    intent: 'default',
    size: 'medium',
  },
});

// --- Component:Button ---
type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type ButtonVariants = VariantProps<typeof buttonStyles>;
export type ButtonProps = {
  /** Change the variant of the Button */
  variant?: ButtonVariants['variant'];
  /** Change the intent of the Button */
  intent?: ButtonVariants['intent'];
  /** Change the size of the Button */
  size?: ButtonVariants['size'];
  /** Change the size if is only an icon */
  icon?: ButtonVariants['icon'];
} & HTMLButtonProps;

/**
 * Displays a button or a component that looks like a button.
 * @param {string} [variant='solid'] - Change the variant of the Button.
 * @param {string} [intent='default'] - Change the intent of the Button.
 * @param {string} [size='medium'] - Change the size of the BUtton.
 * @param {boolean} [icon=false] - Change the size if is only an icon.
 * @see {@link https://dub.sh/XuNhEXJ Button Docs} for further information.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, intent, size, icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles({
          variant,
          intent,
          size,
          icon,
          class: className,
        })}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
