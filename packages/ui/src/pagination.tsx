import { forwardRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

import type { ButtonProps } from '@kosori/ui/button';
import { buttonStyles } from '@kosori/ui/button';

const paginationStyles = tv({
  slots: {
    base: 'mx-auto flex w-full justify-center',
    content: 'flex flex-row items-center gap-1',
    item: '',
    previous: 'gap-1 pl-2.5',
    next: 'gap-1 pr-2.5',
    ellipsis: 'flex h-9 w-9 items-center justify-center',
    ellipsisIcon: 'size-4',
  },
});

const { base, content, item, previous, next, ellipsis, ellipsisIcon } =
  paginationStyles();

/**
 * Pagination component that serves as a container for pagination controls.
 *
 * @param {React.ComponentProps<'nav'>} props - The props for the Pagination component.
 *
 * @example
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href='#' />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href='#'>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href='#' />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 *
 * @see {@link https://dub.sh/ui-pagination Pagination Docs} for further information.
 */
export const Pagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    aria-label='pagination'
    className={base({ className })}
    role='navigation'
    {...props}
  />
);

Pagination.displayName = 'Pagination';

type PaginationContentRef = HTMLUListElement;
type PaginationContentProps = React.ComponentProps<'ul'>;

/**
 * PaginationContent component that wraps the pagination items.
 *
 * @param {React.ComponentProps<'ul'>} props - The props for the PaginationContent component.
 *
 * @example
 * <PaginationContent>
 *   {Pagination items here}
 * </PaginationContent>
 */
export const PaginationContent = forwardRef<
  PaginationContentRef,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={content({ className })} {...props} />
));

PaginationContent.displayName = 'PaginationContent';

type PaginationItemRef = HTMLLIElement;
type PaginationItemProps = React.ComponentProps<'li'>;

/**
 * PaginationItem component that represents an individual item in the pagination.
 *
 * @param {React.ComponentProps<'li'>} props - The props for the PaginationItem component.
 *
 * @example
 * <PaginationItem>
 *   <PaginationLink href='#'>1</PaginationLink>
 * </PaginationItem>
 */
export const PaginationItem = forwardRef<
  PaginationItemRef,
  PaginationItemProps
>(({ className, ...props }, ref) => (
  <li ref={ref} className={item({ className })} {...props} />
));

PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  Pick<ButtonProps, 'icon'> &
  React.ComponentProps<'a'>;

/**
 * PaginationLink component that represents a link to a specific page in the pagination.
 *
 * @param {PaginationLinkProps} props - The props for the PaginationLink component.
 * @param {boolean} [isActive] - Indicates if the link is the active page.
 * @param {string} [size='medium'] - The size of the button (e.g. 'small', 'medium', 'large').
 * @param {boolean} [icon=true] - Indicates if an icon should be displayed.
 *
 * @example
 * <PaginationLink href='#'>1</PaginationLink>
 */

export const PaginationLink = ({
  className,
  isActive,
  size = 'medium',
  icon = true,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={clsx(
      buttonStyles({
        className,
        variant: isActive ? 'outline' : 'ghost',
        size,
        icon,
      }),
    )}
    {...props}
  />
);

PaginationLink.displayName = 'PaginationLink';

type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink>;

/**
 * PaginationPrevious component that represents the link to the previous page.
 *
 * @param {PaginationPreviousProps} props - The props for the PaginationPrevious component.
 *
 * @example
 * <PaginationPrevious href='#' />
 */

export const PaginationPrevious = ({
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label='Go to previous page'
    className={previous({ className })}
    icon={false}
    size='medium'
    {...props}
  >
    <ChevronLeftIcon />
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.displayName = 'PaginationPrevious';

type PaginationNextProps = React.ComponentProps<typeof PaginationLink>;

/**
 * PaginationNext component that represents the link to the next page.
 *
 * @param {PaginationNextProps} props - The props for the PaginationNext component.
 *
 * @example
 * <PaginationNext href='#' />
 */
export const PaginationNext = ({
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label='Go to next page'
    className={next({ className })}
    icon={false}
    size='medium'
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon />
  </PaginationLink>
);

PaginationNext.displayName = 'PaginationNext';

type PaginationEllipsisProps = React.ComponentProps<'span'>;

/**
 * PaginationEllipsis component that indicates there are more pages in the pagination.
 *
 * @param {PaginationEllipsisProps} props - The props for the PaginationEllipsis component.
 *
 * @example
 * <PaginationEllipsis />
 */
export const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span aria-hidden className={ellipsis({ className })} {...props}>
    <DotsHorizontalIcon className={ellipsisIcon()} />
    <span className='sr-only'>More pages</span>
  </span>
);

PaginationEllipsis.displayName = 'PaginationEllipsis';
