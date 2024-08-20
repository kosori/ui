import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const badgeStyles = tv({
  base: 'inline-flex h-fit select-none items-center rounded-full px-2.5 py-1 text-xs font-semibold text-grey-base',
  variants: {
    intent: {
      default: 'bg-grey-text-contrast',
      info: 'bg-info-solid',
      success: 'bg-success-solid',
      warning: clsx(
        'bg-warning-solid text-grey-text-contrast',
        'dark:text-grey-base',
      ),
      error: 'bg-error-solid',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

type HTMLDivProps = React.ComponentPropsWithoutRef<'div'>;
type BadgeVariants = VariantProps<typeof badgeStyles>;
type BadgeProps = HTMLDivProps & BadgeVariants;

/**
 * Badge component that displays a small label or indicator.
 *
 * @param {BadgeProps} props - The props for the Badge component.
 * @param {'default' | 'info' | 'success' | 'warning' | 'error'} [intent='default'] - The visual style of the badge (e.g., 'default', 'info', 'success', 'warning', 'error').
 *
 * @example
 * <Badge intent='info'>Badge</Badge>
 *
 * @see {@link https://dub.sh/ui-badge Badge Docs} for further information.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ intent, className, ...props }, ref) => (
    <div
      ref={ref}
      className={badgeStyles({ intent, class: className })}
      {...props}
    />
  ),
);

Badge.displayName = 'Badge';
