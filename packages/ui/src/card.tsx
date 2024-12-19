import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const cardStyles = tv({
  slots: {
    base: 'rounded-xl border border-grey-line bg-grey-base text-grey-text-contrast shadow-sm',
    header: 'flex flex-col gap-y-1.5 p-6',
    title: 'font-semibold leading-none tracking-tight',
    description: 'text-sm text-grey-text',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },
});

const { base, header, title, description, content, footer } = cardStyles();

type CardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card component that serves as a container for content, typically used to display related information.
 *
 * @param {CardProps} props - The props for the Card component.
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @see {@link https://dub.sh/ui-card Card Docs} for further information.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={base({ className })} {...props} />
  ),
);

Card.displayName = 'Card';

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardHeader component that serves as the header section of the Card.
 *
 * @param {CardHeaderProps} props - Additional props to pass to the CardHeader component.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Card Title</CardTitle>
 *   <CardDescription>Card Description</CardDescription>
 * </CardHeader>
 * ```
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={header({ className })} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * CardTitle component that displays the title of the Card.
 *
 * @param {CardTitleProps} props - Additional props to pass to the CardTitle component.
 *
 * @example
 * ```tsx
 * <CardTitle>Card Title</CardTitle>
 * ```
 */
export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={title({ className })} {...props} />
  ),
);

CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * CardDescription component that provides a brief description of the Card's content.
 *
 * @param {CardDescriptionProps} props - Additional props to pass to the CardDescription component.
 *
 * @example
 * ```tsx
 * <CardDescription>Card Description</CardDescription>
 * ```
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={description({ className })} {...props} />
));

CardDescription.displayName = 'CardDescription';

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardContent component that serves as the main content area of the Card.
 *
 * @param {CardContentProps} props - Additional props to pass to the CardContent component.
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Card Content</p>
 * </CardContent>
 * ```
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={content({ className })} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CardFooter component that serves as the footer section of the Card.
 *
 * @param {CardFooterProps} props - Additional props to pass to the CardFooter component.
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <p>Card Footer</p>
 * </CardFooter>
 * ```
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={footer({ className })} {...props} />
  ),
);

CardFooter.displayName = 'CardFooter';
