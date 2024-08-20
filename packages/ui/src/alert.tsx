import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const alertStyles = tv({
  slots: {
    base: 'relative w-full rounded-xl border bg-grey-base p-4 text-sm shadow-md',
    title: clsx(
      'mb-1 flex items-center gap-x-2 font-medium leading-none tracking-tight text-current',
      '[&_svg]:size-4',
    ),
    description: 'text-grey-text',
  },
  variants: {
    intent: {
      default: {
        base: 'border-grey-line text-grey-text-contrast',
      },
      info: {
        base: 'border-info-line text-info-solid',
      },
      success: {
        base: 'border-success-line text-success-solid',
      },
      warning: {
        base: 'border-warning-line text-warning-solid',
      },
      error: {
        base: 'border-error-line text-error-solid',
      },
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

const { base, title, description } = alertStyles();

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
      className={base({ className, intent })}
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
    <h5 ref={ref} className={title({ className })} {...props} />
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
  <p ref={ref} className={description({ className })} {...props} />
));

AlertDescription.displayName = 'AlertDescription';
