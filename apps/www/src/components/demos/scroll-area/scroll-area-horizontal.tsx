import Image from 'next/image';

import { ScrollArea, ScrollAreaScrollbar } from '@kosori/ui/scroll-area';

export type Artwork = {
  artist: string;
  art: string;
};

export const works: Artwork[] = [
  {
    artist: 'Ornella Binni',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
  },
  {
    artist: 'Tom Byrom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  },
  {
    artist: 'Vladimir Malyavko',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  },
];

export const ScrollAreaHorizontalDemo = () => {
  return (
    <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
      <div className='flex w-max space-x-4 p-4'>
        {works.map((artwork) => (
          <figure key={artwork.artist} className='shrink-0'>
            <div className='overflow-hidden rounded-md'>
              <Image
                alt={`Photo by ${artwork.artist}`}
                className='aspect-[3/4] size-fit object-cover'
                height={400}
                src={artwork.art}
                width={300}
              />
            </div>
            <figcaption className='pt-2 text-xs text-grey-text'>
              Photo by{' '}
              <span className='font-semibold text-grey-text-contrast'>
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollAreaScrollbar orientation='horizontal' />
    </ScrollArea>
  );
};
