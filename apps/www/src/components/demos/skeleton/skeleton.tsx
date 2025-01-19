import { Skeleton } from '@kosori/ui/skeleton';

export const SkeletonDemo = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <Skeleton className='size-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  );
};
