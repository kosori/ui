import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const SLIDES = [
  {
    className:
      'overflow-hidden rounded-xl border bg-linear-to-br from-primary/16 to-background',
    description: 'The first slide of the default carousel.',
    title: 'One',
  },
  {
    className:
      'overflow-hidden rounded-xl border bg-linear-to-br from-info/16 to-background',
    description: 'Slides scroll with the previous and next controls.',
    title: 'Two',
  },
  {
    className:
      'overflow-hidden rounded-xl border bg-linear-to-br from-success/16 to-background',
    description: 'The track also responds to the arrow keys.',
    title: 'Three',
  },
  {
    className:
      'overflow-hidden rounded-xl border bg-linear-to-br from-warning/16 to-background',
    description: 'Every slide shares the same width.',
    title: 'Four',
  },
  {
    className:
      'overflow-hidden rounded-xl border bg-linear-to-br from-destructive/16 to-background',
    description: 'The last slide disables the next control.',
    title: 'Five',
  },
];

const CarouselExample = () => (
  <div className='w-full max-w-md px-12'>
    <Carousel>
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide.title}>
            <AspectRatio className={slide.className} ratio={16 / 9}>
              <div className='flex size-full flex-col justify-end gap-1 p-5'>
                <span className='font-medium text-lg'>{slide.title}</span>
                <span className='text-muted-foreground text-sm'>
                  {slide.description}
                </span>
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export default CarouselExample;
