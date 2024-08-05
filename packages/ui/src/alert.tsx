import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const alertStyles = tv({
  base: cn(
    'relative w-full rounded-xl border bg-grey-base p-4 text-sm shadow-md',
  ),
  variants: {
    intent: {
      default: cn('border-grey-line text-grey-text-contrast'),
      info: cn('border-info-line text-info-solid'),
      success: cn('border-success-line text-success-solid'),
      warning: cn('border-warning-line text-warning-solid'),
      error: cn('border-error-line text-error-solid'),
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

// --- Component:Alert ---
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type AlertVariants = VariantProps<typeof alertStyles>;
type AlertProps = object & DivProps & AlertVariants;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, intent, ...props }, ref) => (
    <div
      ref={ref}
      className={alertStyles({ intent, class: className })}
      role='alert'
      {...props}
    />
  ),
);

Alert.displayName = 'Alert';

// --- Component:AlertTitle ---
type AlertTitleRef = HTMLParagraphElement;
type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = forwardRef<AlertTitleRef, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        'mb-1 flex items-center gap-x-2 font-medium leading-none tracking-tight text-current',
        '[&_svg]:h-4 [&_svg]:w-4',
        className,
      )}
      {...props}
    />
  ),
);

AlertTitle.displayName = 'AlertTitle';

// --- Component:AlertDescription ---
type AlertDescriptionRef = HTMLParagraphElement;
type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription = forwardRef<
  AlertDescriptionRef,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-grey-text', className)} {...props} />
));

AlertDescription.displayName = 'AlertDescription';
