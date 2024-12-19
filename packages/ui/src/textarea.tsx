import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const textareaStyles = tv({
  base: clsx(
    'flex min-h-[60px] w-full rounded-lg border border-grey-border bg-grey-base px-3 py-2 text-sm shadow-sm outline-none transition-colors duration-200',
    'placeholder:text-grey-placeholder-text',
    'hover:border-grey-border-hover',
    'focus:ring-4 focus:ring-grey-focus-ring',
    'disabled:cursor-not-allowed disabled:border-grey-line disabled:bg-grey-bg disabled:text-grey-solid',
    'aria-[invalid=true]:border-error-border',
    'aria-[invalid=true]:hover:border-error-border-hover',
    'aria-[invalid=true]:focus:ring-error-focus-ring',
  ),
});

export type TextareaProps = object &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Textarea component that allows users to input multi-line text.
 *
 * @param {TextareaProps} props - The props for the Textarea component.
 *
 * @example
 * ```tsx
 * <Textarea />
 * ```
 *
 * @see {@link https://dub.sh/ui-textarea Textarea Docs} for further information.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={textareaStyles({ className })}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
