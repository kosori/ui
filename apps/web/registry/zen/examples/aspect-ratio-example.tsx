import { AspectRatio } from '@/components/ui/aspect-ratio';

const AspectRatioExample = () => (
  <div className='w-full max-w-sm'>
    <AspectRatio className='overflow-hidden rounded-lg bg-muted'>
      <div className='flex size-full items-center justify-center text-muted-foreground text-sm'>
        16 : 9
      </div>
    </AspectRatio>
  </div>
);

export default AspectRatioExample;
