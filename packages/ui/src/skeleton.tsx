import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const skeletonStyles = tv({
  base: clsx(
    'transition-background pointer-events-none relative overflow-hidden rounded-md bg-grey-bg duration-300',
    'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:border-t before:border-grey-bg-active before:bg-gradient-to-r before:from-transparent before:via-grey-bg-active/80 before:to-transparent',
  ),
});

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton component that serves as a placeholder for loading content.
 *
 * @param {SkeletonProps} props - The props for the Skeleton component.
 *
 * @example
 * ```tsx
 * <Skeleton className='h-[20px] w-[100px] rounded-full' />
 * ```
 *
 * @see {@link https://dub.sh/ui-skeleton Skeleton Docs} for further information.
 */
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={skeletonStyles({ className })} {...props} />;
};
