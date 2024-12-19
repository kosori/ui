import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const badgeStyles = tv({
  base: 'inline-flex size-fit select-none items-center rounded-lg font-semibold',
  variants: {
    intent: {
      default: '',
      info: '',
      success: '',
      warning: '',
      error: '',
    },
    size: {
      small: 'px-1.5 py-0.5 text-xs',
      medium: 'px-2 py-0.5 text-sm',
      large: 'px-2.5 py-0.5 text-base',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
    },
  },
  compoundVariants: [
    {
      intent: 'default',
      variant: 'solid',
      class: 'bg-primary-solid text-primary-base',
    },
    {
      intent: 'default',
      variant: 'outline',
      class:
        'border border-primary-line bg-primary-base text-primary-text-contrast',
    },
    {
      intent: 'default',
      variant: 'soft',
      class: 'bg-primary-bg text-primary-text-contrast',
    },
    {
      intent: 'info',
      variant: 'solid',
      class: 'bg-info-solid text-info-base',
    },
    {
      intent: 'info',
      variant: 'outline',
      class: 'border border-info-line bg-info-base text-info-solid',
    },
    {
      intent: 'info',
      variant: 'soft',
      class: 'bg-info-bg text-info-solid',
    },
    {
      intent: 'success',
      variant: 'solid',
      class: 'bg-success-solid text-success-base',
    },
    {
      intent: 'success',
      variant: 'outline',
      class: 'border border-success-line bg-success-base text-success-solid',
    },
    {
      intent: 'success',
      variant: 'soft',
      class: 'bg-success-bg text-success-solid',
    },
    {
      intent: 'warning',
      variant: 'solid',
      class: 'bg-warning-solid text-warning-base',
    },
    {
      intent: 'warning',
      variant: 'outline',
      class: 'border border-warning-line bg-warning-base text-warning-text',
    },
    {
      intent: 'warning',
      variant: 'soft',
      class: 'bg-warning-bg text-warning-text',
    },
    {
      intent: 'error',
      variant: 'solid',
      class: 'bg-error-solid text-error-base',
    },
    {
      intent: 'error',
      variant: 'outline',
      class: 'border border-error-line bg-error-base text-error-solid',
    },
    {
      intent: 'error',
      variant: 'soft',
      class: 'bg-error-bg text-error-solid',
    },
  ],
  defaultVariants: {
    intent: 'default',
    size: 'medium',
    variant: 'solid',
  },
});

type HTMLDivProps = React.ComponentPropsWithoutRef<'div'>;
type BadgeVariants = VariantProps<typeof badgeStyles>;
type BadgeProps = HTMLDivProps & BadgeVariants;

/**
 * Badge component that displays a small label or indicator.
 *
 * @param {BadgeProps} props - The props for the Badge component.
 * @param {'default' | 'info' | 'success' | 'warning' | 'error'} [intent='default'] - The intent of the badge, affecting its color scheme (e.g., 'default', 'info', 'success', 'warning', 'error').
 * @param {'small' | 'medium' | 'large'} [size='medium'] - The size of the badge (e.g., 'small', 'medium', 'large').
 * @param {'solid' | 'outline' | 'soft'} [variant='solid'] - The visual style of the badge (e.g., 'solid', 'outline', 'soft').
 *
 * @example
 * ```tsx
 * <Badge intent='info'>Badge</Badge>
 * ```
 *
 * @see {@link https://dub.sh/ui-badge Badge Docs} for further information.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ intent, size, variant, className, ...props }, ref) => (
    <div
      ref={ref}
      className={badgeStyles({ intent, size, variant, class: className })}
      {...props}
    />
  ),
);

Badge.displayName = 'Badge';
