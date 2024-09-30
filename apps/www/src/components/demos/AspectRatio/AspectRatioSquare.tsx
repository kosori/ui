import Image from 'next/image';

import { AspectRatio } from '@kosori/ui/aspect-ratio';

export const AspectRatioSquareDemo = () => {
  return (
    <div className='w-full max-w-xs overflow-hidden rounded-xl'>
      <AspectRatio ratio={1 / 1}>
        <Image
          alt='Landscape photograph by Tobias Tullius'
          className='h-full w-full object-cover'
          height={216}
          src='https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80'
          width={384}
        />
      </AspectRatio>
    </div>
  );
};
