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

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type AlertVariants = VariantProps<typeof alertStyles>;
type AlertProps = DivProps & AlertVariants;

/**
 * Alert component that displays a message with an optional title and description.
 *
 * @param {AlertProps} props - The props for the Alert component.
 * @param {'default' | 'info' | 'success' | 'warning' | 'error'} [intent='default'] - The visual style of the alert (e.g., 'info', 'success', 'warning', 'error').
 *
 * @example
 * // Basic usage
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components and dependencies to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 *
 * @example
 * // Alert with a specific intent
 * <Alert intent="success">
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>
 *     Your changes have been saved successfully.
 *   </AlertDescription>
 * </Alert>
 *
 * @see {@link https://dub.sh/ui-alert Alert Docs} for further information.
 */
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

type AlertTitleRef = HTMLParagraphElement;
type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * AlertTitle component for the Alert.
 *
 * @param {AlertTitleProps} props - Additional props to pass to the title element.
 *
 * @example
 * <AlertTitle>Heads up!</AlertTitle>
 */
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

type AlertDescriptionRef = HTMLParagraphElement;
type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * AlertDescription component for the Alert.
 *
 * @param {AlertDescriptionProps} props - Additional props to pass to the description element.
 *
 * @example
 * <AlertDescription>
 *   You can add components and dependencies to your app using the cli.
 * </AlertDescription>
 */
export const AlertDescription = forwardRef<
  AlertDescriptionRef,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-grey-text', className)} {...props} />
));

AlertDescription.displayName = 'AlertDescription';
