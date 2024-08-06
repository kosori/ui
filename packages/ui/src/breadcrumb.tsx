import { forwardRef } from 'react';
import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@kosori/ui';

// --- Component:Breadcrumb ---
type BreadcrumbRef = HTMLElement;
type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'> & {
  separator?: React.ReactNode;
};

export const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />,
);

Breadcrumb.displayName = 'Breadcrumb';

// --- Component:BreadcrumbList ---
type BreadcrumbListRef = HTMLOListElement;
type BreadcrumbListProps = React.ComponentPropsWithoutRef<'ol'>;

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

// --- Component:BreadcrumbItem ---
type BreadcrumbItemRef = HTMLLIElement;
type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>;

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

// --- Component:BreadcrumbLink ---
type BreadcrumbLinkRef = HTMLAnchorElement;
type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean;
};

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

// --- Component:BreadcrumbSeparator ---
export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
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

// --- Component:BreadcrumbPage ---
type BreadcrumbPageRef = HTMLSpanElement;
type BreadcrumbPageProps = React.ComponentPropsWithoutRef<'span'>;

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

// --- Component:BreadcrumbEllipsis ---
type BreadcrumbEllipsisProps = React.ComponentProps<'span'>;

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
