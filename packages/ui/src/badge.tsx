import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const badgeStyles = tv({
  base: cn(
    'inline-flex h-fit select-none items-center rounded-full px-2.5 py-1 text-xs font-semibold text-grey-base',
  ),
  variants: {
    intent: {
      default: 'bg-grey-text-contrast',
      info: 'bg-info-solid',
      success: 'bg-success-solid',
      warning: cn(
        'bg-warning-solid text-grey-text-contrast',
        'dark:text-grey-base',
      ),
      danger: 'bg-danger-solid',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

// --- Component:Badge ---
type HTMLDivProps = React.ComponentPropsWithoutRef<'div'>;
type BadgeVariants = VariantProps<typeof badgeStyles>;
type BadgeProps = object & HTMLDivProps & BadgeVariants;

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
