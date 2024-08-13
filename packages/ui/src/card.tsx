import { forwardRef } from 'react';

import { cn } from '@kosori/ui';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card component that serves as a container for content, typically used to display related information.
 *
 * @param {CardProps} props - The props for the Card component.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card Content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <p>Card Footer</p>
 *   </CardFooter>
 * </Card>
 *
 * @see {@link https://dub.sh/ui-card Card Docs} for further information.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-grey-line bg-grey-base text-grey-text-contrast shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = 'Card';

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardHeader component that serves as the header section of the Card.
 *
 * @param {CardHeaderProps} props - Additional props to pass to the CardHeader component.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-y-1.5 p-6', className)}
      {...props}
    />
  ),
);

CardHeader.displayName = 'CardHeader';

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * CardTitle component that displays the title of the Card.
 *
 * @param {CardTitleProps} props - Additional props to pass to the CardTitle component.
 */
export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * CardDescription component that provides a brief description of the Card's content.
 *
 * @param {CardDescriptionProps} props - Additional props to pass to the CardDescription component.
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-grey-text', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardContent component that serves as the main content area of the Card.
 *
 * @param {CardContentProps} props - Additional props to pass to the CardContent component.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardFooter component that serves as the footer section of the Card.
 *
 * @param {CardFooterProps} props - Additional props to pass to the CardFooter component.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);

CardFooter.displayName = 'CardFooter';
