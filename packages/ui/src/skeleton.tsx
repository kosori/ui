import { cn } from '@kosori/ui';

// --- Component:Skeleton ---
type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-grey-bg', className)}
      {...props}
    />
  );
};
