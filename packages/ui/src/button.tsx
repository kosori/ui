import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: clsx(
    'flex size-fit items-center justify-center font-semibold outline-none transition-colors duration-200',
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
      info: '',
      success: '',
      warning: '',
      error: '',
    },
    size: {
      small: clsx(
        'h-8 gap-x-1.5 rounded-lg px-2.5 text-xs leading-4',
        '[&_svg]:size-3.5',
      ),
      medium: clsx('h-9 gap-x-2 rounded-lg px-3 text-sm', '[&_svg]:size-4'),
      large: clsx('text-md h-10 gap-x-2.5 rounded-xl px-4', '[&_svg]:size-5'),
    },
    icon: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      intent: 'default',
      class: clsx(
        'bg-primary-solid text-primary-base',
        'hover:bg-primary-solid-hover',
        'focus-visible:ring-primary-focus-ring',
        'disabled:bg-primary-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'default',
      class: clsx(
        'bg-primary-bg text-primary-solid',
        'hover:bg-primary-bg-hover',
        'active:bg-primary-bg-active',
        'focus-visible:ring-primary-focus-ring',
        'disabled:bg-primary-bg-subtle disabled:text-primary-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'default',
      class: clsx(
        'border border-primary-border bg-primary-base text-primary-solid',
        'hover:border-primary-border-hover hover:bg-primary-bg-subtle',
        'active:bg-primary-bg',
        'focus-visible:ring-primary-focus-ring',
        'disabled:border-primary-line disabled:bg-primary-base disabled:text-primary-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'default',
      class: clsx(
        'text-primary-text-contrast',
        'hover:bg-primary-bg-hover',
        'active:bg-primary-bg-active',
        'focus-visible:ring-primary-focus-ring',
        'disabled:bg-transparent disabled:text-primary-solid',
      ),
    },

    {
      variant: 'solid',
      intent: 'info',
      class: clsx(
        'bg-info-solid text-white',
        'hover:bg-info-solid-hover',
        'focus-visible:ring-info-focus-ring',
        'disabled:bg-info-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'info',
      class: clsx(
        'bg-info-bg text-info-solid',
        'hover:bg-info-bg-hover',
        'active:bg-info-bg-active',
        'focus-visible:ring-info-focus-ring',
        'disabled:bg-info-bg-subtle disabled:text-info-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'info',
      class: clsx(
        'border border-info-border bg-info-base text-info-solid',
        'hover:border-info-border-hover hover:bg-info-bg-subtle',
        'active:bg-info-bg',
        'focus-visible:ring-info-focus-ring',
        'disabled:border-info-line disabled:bg-info-base disabled:text-info-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'info',
      class: clsx(
        'text-info-solid',
        'hover:bg-info-bg',
        'active:bg-info-bg-hover',
        'focus-visible:ring-info-focus-ring',
        'disabled:bg-transparent disabled:text-info-line',
      ),
    },

    {
      variant: 'solid',
      intent: 'success',
      class: clsx(
        'bg-success-solid text-white',
        'hover:bg-success-solid-hover',
        'focus-visible:ring-success-focus-ring',
        'disabled:bg-success-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'success',
      class: clsx(
        'bg-success-bg text-success-solid',
        'hover:bg-success-bg-hover',
        'active:bg-success-bg-active',
        'focus-visible:ring-success-focus-ring',
        'disabled:bg-success-bg-subtle disabled:text-success-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'success',
      class: clsx(
        'border border-success-border bg-success-base text-success-solid',
        'hover:border-success-border-hover hover:bg-success-bg-subtle',
        'active:bg-success-bg',
        'focus-visible:ring-success-focus-ring',
        'disabled:border-success-line disabled:bg-success-base disabled:text-success-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'success',
      class: clsx(
        'text-success-solid',
        'hover:bg-success-bg',
        'active:bg-success-bg-hover',
        'focus-visible:ring-success-focus-ring',
        'disabled:bg-transparent disabled:text-success-line',
      ),
    },

    {
      variant: 'solid',
      intent: 'warning',
      class: clsx(
        'bg-warning-solid text-white',
        'hover:bg-warning-solid-hover',
        'focus-visible:ring-warning-focus-ring',
        'disabled:bg-warning-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'warning',
      class: clsx(
        'bg-warning-bg text-warning-solid',
        'hover:bg-warning-bg-hover',
        'active:bg-warning-bg-active',
        'focus-visible:ring-warning-focus-ring',
        'disabled:bg-warning-bg-subtle disabled:text-warning-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'warning',
      class: clsx(
        'border border-warning-border bg-warning-base text-warning-solid',
        'hover:border-warning-border-hover hover:bg-warning-bg-subtle',
        'active:bg-warning-bg',
        'focus-visible:ring-warning-focus-ring',
        'disabled:border-warning-line disabled:bg-warning-base disabled:text-warning-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'warning',
      class: clsx(
        'text-warning-solid',
        'hover:bg-warning-bg',
        'active:bg-warning-bg-hover',
        'focus-visible:ring-warning-focus-ring',
        'disabled:bg-transparent disabled:text-warning-line',
      ),
    },

    {
      variant: 'solid',
      intent: 'error',
      class: clsx(
        'bg-error-solid text-white',
        'hover:bg-error-solid-hover',
        'focus-visible:ring-error-focus-ring',
        'disabled:bg-error-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'error',
      class: clsx(
        'bg-error-bg text-error-solid',
        'hover:bg-error-bg-hover',
        'active:bg-error-bg-active',
        'focus-visible:ring-error-focus-ring',
        'disabled:bg-error-bg-subtle disabled:text-error-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'error',
      class: clsx(
        'border border-error-border bg-error-base text-error-solid',
        'hover:border-error-border-hover hover:bg-error-bg-subtle',
        'active:bg-error-bg',
        'focus-visible:ring-error-focus-ring',
        'disabled:border-error-line disabled:bg-error-base disabled:text-error-line',
      ),
    },
    {
      variant: 'ghost',
      intent: 'error',
      class: clsx(
        'text-error-solid',
        'hover:bg-error-bg',
        'active:bg-error-bg-hover',
        'focus-visible:ring-error-focus-ring',
        'disabled:bg-transparent disabled:text-error-line',
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

type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type ButtonVariants = VariantProps<typeof buttonStyles>;
export type ButtonProps = {
  /** Change the default rendered element for the one passed as a child, merging their props and behavior. */
  asChild?: boolean;
} & HTMLButtonProps &
  ButtonVariants;

/**
 * Button component that renders a customizable button or a component that looks like a button.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {boolean} [asChild=false] - If true, renders the button as a child component, merging props and behavior.
 * @param {'solid' | 'soft' | 'outline' | 'ghost'} [variant='solid'] - The visual style of the button (e.g., 'solid', 'soft', 'outline', 'ghost').
 * @param {'default' | 'error'} [intent='default'] - The intent of the button, affecting its color scheme (e.g., 'default', 'error').
 * @param {'small' | 'medium' | 'large'} [size='medium'] - The size of the button (e.g., 'small', 'medium', 'large').
 * @param {boolean} [icon=false] - If true, adjusts the button size for icon-only usage.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click Me</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Using variants and intents
 * <Button variant='outline' intent='error'>Delete</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Icon button
 * <Button icon>
 *   <Icon />
 * </Button>
 * ```
 *
 * @see {@link https://dub.sh/ui-button Button Docs} for further information.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, variant, intent, size, icon, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
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
