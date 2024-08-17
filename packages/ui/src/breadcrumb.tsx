import { forwardRef } from 'react';
import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@kosori/ui';

type BreadcrumbRef = HTMLElement;
type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'>;

/**
 * Breadcrumb component that serves as a navigation aid, indicating the current page's location within a hierarchy.
 *
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbEllipsis className='h-4 w-4' />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href='/docs/ui'>UI</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 *
 * @see {@link https://dub.sh/ui-breadcrumb Breadcrumb Docs} for further information.
 */
export const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />,
);

Breadcrumb.displayName = 'Breadcrumb';

type BreadcrumbListRef = HTMLOListElement;
type BreadcrumbListProps = React.ComponentPropsWithoutRef<'ol'>;

/**
 * BreadcrumbList component that wraps the list of breadcrumb items.
 *
 * @param {BreadcrumbListProps} props - Additional props to pass to the BreadcrumbList component.
 */
export const BreadcrumbList = forwardRef<
  BreadcrumbListRef,
  BreadcrumbListProps
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-grey-text',
      'sm:gap-2.5',
      className,
    )}
    {...props}
  />
));

BreadcrumbList.displayName = 'BreadcrumbList';

type BreadcrumbItemRef = HTMLLIElement;
type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * BreadcrumbItem component that represents a single item in the breadcrumb trail.
 *
 * @param {BreadcrumbItemProps} props - Additional props to pass to the BreadcrumbItem component.
 */
export const BreadcrumbItem = forwardRef<
  BreadcrumbItemRef,
  BreadcrumbItemProps
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));

BreadcrumbItem.displayName = 'BreadcrumbItem';

type BreadcrumbLinkRef = HTMLAnchorElement;
type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean;
};

/**
 * BreadcrumbLink component that serves as a clickable link within the breadcrumb.
 *
 * @param {BreadcrumbLinkProps} props - Additional props to pass to the BreadcrumbLink component.
 *
 * @example
 * <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 */
export const BreadcrumbLink = forwardRef<
  BreadcrumbLinkRef,
  BreadcrumbLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-colors',
        'hover:text-grey-text-contrast',
        className,
      )}
      {...props}
    />
  );
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * BreadcrumbSeparator component that visually separates breadcrumb items.
 *
 * @param {BreadcrumbSeparatorProps} props - Additional props to pass to the BreadcrumbSeparator component.
 *
 * @example
 * <BreadcrumbSeparator />
 */
export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    aria-hidden='true'
    className={cn('[&>svg]:size-3.5', className)}
    role='presentation'
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

type BreadcrumbPageRef = HTMLSpanElement;
type BreadcrumbPageProps = React.ComponentPropsWithoutRef<'span'>;

/**
 * BreadcrumbPage component that indicates the current page in the breadcrumb trail.
 *
 * @param {BreadcrumbPageProps} props - Additional props to pass to the BreadcrumbPage component.
 *
 * @example
 * <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 */
export const BreadcrumbPage = forwardRef<
  BreadcrumbPageRef,
  BreadcrumbPageProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current='page'
    aria-disabled='true'
    className={cn('font-normal text-grey-text-contrast', className)}
    role='link'
    {...props}
  />
));

BreadcrumbPage.displayName = 'BreadcrumbPage';

type BreadcrumbEllipsisProps = React.ComponentProps<'span'>;

/**
 * BreadcrumbEllipsis component that indicates more items in the breadcrumb trail.
 *
 * @param {BreadcrumbEllipsisProps} props - Additional props to pass to the BreadcrumbEllipsis component.
 *
 * @example
 * <BreadcrumbEllipsis />
 */
export const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden='true'
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    role='presentation'
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More</span>
  </span>
);

BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';
