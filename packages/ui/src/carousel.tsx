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
import { tv } from 'tailwind-variants';

import { Button } from '@kosori/ui/button';

const carouselStyles = tv({
  slots: {
    base: 'relative',
    content: 'flex',
    item: 'min-w-0 shrink-0 grow-0 basis-full',
    next: 'absolute rounded-full',
    previous: 'absolute rounded-full',
  },
  variants: {
    orientation: {
      horizontal: {
        content: '-ml-4',
        item: 'pl-4',
        next: '-right-12 top-1/2 -translate-y-1/2',
        previous: '-left-12 top-1/2 -translate-y-1/2',
      },
      vertical: {
        content: '-mt-4 flex-col',
        item: 'pt-4',
        next: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        previous: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      },
    },
  },
});

const { base, content, item, next, previous } = carouselStyles();

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

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

/**
 * Carousel component that provides a sliding interface for displaying content.
 *
 * @param {CarouselProps} props - The props for the Carousel component.
 * @param {CarouselOptions} [opts] - Options for the carousel.
 * @param {CarouselPlugin} [plugins] - Plugins for the carousel.
 * @param {'horizontal' | 'vertical'} [orientation='horizontal'] - Orientation of the carousel.
 * @param {(api: CarouselApi) => void} [setApi] - Callback to set the carousel API.
 *
 * @example
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>...</CarouselItem>
 *     <CarouselItem>...</CarouselItem>
 *     <CarouselItem>...</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 *
 * @see {@link https://dub.sh/ui-carousel Carousel Docs} for further information.
 */
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
          className={base({ className })}
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

/**
 * CarouselContent component that wraps the content of the Carousel.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Additional props to pass to the CarouselContent component.
 *
 * @example
 * <CarouselContent>
 *   <CarouselItem>...</CarouselItem>
 * </CarouselContent>
 */
export const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={content({ className, orientation })}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = 'CarouselContent';

/**
 * CarouselItem component that represents a single item in the Carousel.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Additional props to pass to the CarouselItem component.
 *
 * @example
 * <CarouselItem>...</CarouselItem>
 */
export const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      aria-roledescription='slide'
      className={item({ className, orientation })}
      role='group'
      {...props}
    />
  );
});

CarouselItem.displayName = 'CarouselItem';

/**
 * CarouselNext component that provides a button to navigate to the next item in the Carousel.
 *
 * @param {React.ComponentProps<typeof Button>} props - Additional props to pass to the CarouselNext component.
 *
 * @example
 * <CarouselNext />
 */
export const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(
  (
    { className, icon = true, size = 'small', variant = 'outline', ...props },
    ref,
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        className={next({ className, orientation })}
        disabled={!canScrollNext}
        icon={icon}
        size={size}
        variant={variant}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRightIcon />
        <span className='sr-only'>Next slide</span>
      </Button>
    );
  },
);

/**
 * CarouselPrevious component that provides a button to navigate to the previous item in the Carousel.
 *
 * @param {React.ComponentProps<typeof Button>} props - Additional props to pass to the CarouselPrevious component.
 *
 * @example
 * <CarouselPrevious />
 */
export const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(
  (
    { className, icon = true, size = 'small', variant = 'outline', ...props },
    ref,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        className={previous({ className, orientation })}
        disabled={!canScrollPrev}
        icon={icon}
        size={size}
        variant={variant}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeftIcon />
        <span className='sr-only'>Previous slide</span>
      </Button>
    );
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';
