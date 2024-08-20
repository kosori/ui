import { tv } from 'tailwind-variants';

const skeletonStyles = tv({
  base: 'animate-pulse rounded-md bg-grey-bg',
});

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton component that serves as a placeholder for loading content.
 *
 * @param {SkeletonProps} props - The props for the Skeleton component.
 *
 * @example
 * <Skeleton className='h-[20px] w-[100px] rounded-full' />
 *
 * @see {@link https://dub.sh/ui-skeleton Skeleton Docs} for further information.
 */

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={skeletonStyles({ className })} {...props} />;
};
