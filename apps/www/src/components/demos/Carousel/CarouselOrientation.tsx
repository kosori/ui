import { Card, CardContent } from '@kosori/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@kosori/ui/carousel';

export const CarouselOrientationDemo = () => {
  return (
    <Carousel
      className='w-full max-w-xs'
      opts={{
        align: 'start',
      }}
      orientation='vertical'
    >
      <CarouselContent className='-mt-1 h-[200px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='pt-1 md:basis-1/2'>
            <div className='p-1'>
              <Card>
                <CardContent className='flex items-center justify-center p-6'>
                  <span className='text-3xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
