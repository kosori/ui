'use client';

import type { UseEmblaCarouselType } from 'embla-carousel-react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@kosori/ui';
import { Button } from '@kosori/ui/button';

// --- Component:CarouselContext ---
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

export const CarouselContext = createContext<CarouselContextProps | null>(null);

// --- Component:useCarousel ---
export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

// --- Component:Carousel ---
export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

export const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          aria-roledescription='carousel'
          className={cn('relative', className)}
          role='region'
          onKeyDownCapture={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = 'Carousel';

// --- Component:CarouselContent ---
export const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = 'CarouselContent';

// --- Component:CarouselItem ---
export const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      role='group'
      {...props}
    />
  );
});

CarouselItem.displayName = 'CarouselItem';

// --- Component:CarouselNext ---
export const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', icon = true, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      icon={icon}
      variant={variant}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});

// --- Component:CarouselPrevious ---
export const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', icon = true, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      icon={icon}
      variant={variant}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className='h-4 w-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});

CarouselPrevious.displayName = 'CarouselPrevious';
