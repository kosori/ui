import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
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
      error: '',
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
      intent: 'error',
      class: cn(
        'bg-error-solid text-white',
        'hover:bg-error-solid-hover',
        'focus-visible:ring-error-focus-ring',
        'disabled:bg-error-border',
      ),
    },
    {
      variant: 'soft',
      intent: 'error',
      class: cn(
        'border border-error-border bg-error-bg text-error-solid',
        'hover:border-error-border-hover hover:bg-error-bg-hover',
        'active:bg-error-bg-active',
        'focus-visible:ring-error-focus-ring',
        'disabled:border-error-line disabled:bg-error-bg-subtle disabled:text-error-line',
      ),
    },
    {
      variant: 'outline',
      intent: 'error',
      class: cn(
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
      class: cn(
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
 * // Basic usage
 * <Button>Click Me</Button>
 *
 * @example
 * // Using variants and intents
 * <Button variant="outline" intent="error">Delete</Button>
 *
 * @example
 * // Icon button
 * <Button icon>
 *   <Icon />
 * </Button>
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
