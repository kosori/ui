import { forwardRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { cn } from '@kosori/ui';
import { ButtonProps, buttonStyles } from '@kosori/ui/button';

export const Pagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    role='navigation'
    {...props}
  />
);

Pagination.displayName = 'Pagination';

// --- Component:PaginationContent ---
export const PaginationContent = forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));

PaginationContent.displayName = 'PaginationContent';

// --- Component:PaginationItem ---
export const PaginationItem = forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));

PaginationItem.displayName = 'PaginationItem';

// --- Component:PaginationLink ---
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  Pick<ButtonProps, 'icon'> &
  React.ComponentProps<'a'>;

export const PaginationLink = ({
  className,
  isActive,
  size = 'medium',
  icon = true,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonStyles({
        variant: isActive ? 'outline' : 'ghost',
        size,
        icon,
      }),
      className,
    )}
    {...props}
  />
);

PaginationLink.displayName = 'PaginationLink';

// --- Component:PaginationPrevious ---
type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink>;

export const PaginationPrevious = ({
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label='Go to previous page'
    className={cn('gap-1 pl-2.5', className)}
    icon={false}
    size='medium'
    {...props}
  >
    <ChevronLeftIcon className='h-4 w-4' />
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.displayName = 'PaginationPrevious';

// --- Component:PaginationNext ---
type PaginationNextProps = React.ComponentProps<typeof PaginationLink>;

export const PaginationNext = ({
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label='Go to next page'
    className={cn('gap-1 pr-2.5', className)}
    icon={false}
    size='medium'
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className='h-4 w-4' />
  </PaginationLink>
);

PaginationNext.displayName = 'PaginationNext';

// --- Component:PaginationEllipsis ---
type PaginationEllipsisProps = React.ComponentProps<'span'>;

export const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);

PaginationEllipsis.displayName = 'PaginationEllipsis';
