import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const inputStyles = tv({
  base: clsx(
    'flex h-9 w-full justify-center rounded-lg border border-grey-border bg-grey-base px-3 py-1 text-sm outline-none transition-colors duration-200',
    'placeholder:text-grey-placeholder-text',
    'hover:border-grey-border-hover',
    'focus:ring-4 focus:ring-grey-focus-ring',
    'disabled:cursor-not-allowed disabled:border-grey-line disabled:bg-grey-bg disabled:text-grey-solid',
    'aria-[invalid=true]:border-error-border',
    'aria-[invalid=true]:hover:border-error-border-hover',
    'aria-[invalid=true]:focus:ring-error-focus-ring',
    'file:cursor-pointer file:border-0 file:bg-transparent file:pt-[0.25rem] file:font-medium file:text-grey-text-contrast',
    'file:disabled:cursor-not-allowed file:disabled:text-grey-solid',
  ),
});

type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputVariants = VariantProps<typeof inputStyles>;
type InputProps = HTMLInputProps & InputVariants;

/**
 * Input component that renders a styled input field.
 *
 * @param {InputProps} props - The props for the Input component.
 *
 * @example
 * <Input />
 *
 * @see {@link https://dub.sh/ui-input Input Docs} for further information.
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      className={inputStyles({ class: className })}
      type={type}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
