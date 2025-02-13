import { forwardRef } from 'react';
import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const breadcrumbStyles = tv({
  slots: {
    list: clsx(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-grey-text',
      'sm:gap-2.5',
    ),
    item: 'inline-flex items-center gap-1.5',
    link: clsx('transition-colors', 'hover:text-grey-text-contrast'),
    separator: '[&>svg]:size-3.5',
    page: 'font-normal text-grey-text-contrast',
    ellipsis: 'flex size-9 items-center justify-center',
    ellipsisIcon: 'size-4',
  },
});

const { list, item, link, separator, page, ellipsis, ellipsisIcon } =
  breadcrumbStyles();

type BreadcrumbRef = HTMLElement;
type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'>;

/**
 * Breadcrumb component that serves as a navigation aid, indicating the current page's location within a hierarchy.
 *
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbEllipsis className='size-4' />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href='/docs/ui'>UI</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
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
 * ```tsx
 * <BreadcrumbList>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 */
export const BreadcrumbList = forwardRef<
  BreadcrumbListRef,
  BreadcrumbListProps
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={list({ className })} {...props} />
));

BreadcrumbList.displayName = 'BreadcrumbList';

type BreadcrumbItemRef = HTMLLIElement;
type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * BreadcrumbItem component that represents a single item in the breadcrumb trail.
 *
 * @param {BreadcrumbItemProps} props - Additional props to pass to the BreadcrumbItem component.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 * </BreadcrumbItem>
 * ```
 */
export const BreadcrumbItem = forwardRef<
  BreadcrumbItemRef,
  BreadcrumbItemProps
>(({ className, ...props }, ref) => (
  <li ref={ref} className={item({ className })} {...props} />
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
 * ```tsx
 * <BreadcrumbLink href='/'>Home</BreadcrumbLink>
 * ```
 */
export const BreadcrumbLink = forwardRef<
  BreadcrumbLinkRef,
  BreadcrumbLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return <Comp ref={ref} className={link({ className })} {...props} />;
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * BreadcrumbSeparator component that visually separates breadcrumb items.
 *
 * @param {BreadcrumbSeparatorProps} props - Additional props to pass to the BreadcrumbSeparator component.
 *
 * @example
 * ```tsx
 * <BreadcrumbSeparator />
 * ```
 */
export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    aria-hidden='true'
    className={separator({ className })}
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
 * ```tsx
 * <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 * ```
 */
export const BreadcrumbPage = forwardRef<
  BreadcrumbPageRef,
  BreadcrumbPageProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current='page'
    aria-disabled='true'
    className={page({ className })}
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
 * ```tsx
 * <BreadcrumbEllipsis />
 * ```
 */
export const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden='true'
    className={ellipsis({ className })}
    role='presentation'
    {...props}
  >
    <DotsHorizontalIcon className={ellipsisIcon()} />
    <span className='sr-only'>More</span>
  </span>
);

BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';
