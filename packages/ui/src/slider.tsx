'use client';

import { forwardRef } from 'react';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';

import { cn } from '@kosori/ui';

// --- Component:Slider ---
type SliderRef = React.ElementRef<typeof Root>;
type SliderProps = React.ComponentPropsWithoutRef<typeof Root>;

export const Slider = forwardRef<SliderRef, SliderProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        'group relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <Track
        className={cn(
          'relative h-1.5 w-full grow cursor-pointer overflow-hidden rounded-full bg-grey-bg',
          'group-data-[disabled]:cursor-not-allowed',
        )}
      >
        <Range
          className={cn(
            'absolute h-full bg-grey-text-contrast',
            'group-data-[disabled]:cursor-not-allowed',
          )}
        />
      </Track>

      <Thumb
        className={cn(
          'block h-4 w-4 cursor-pointer rounded-full border-2 border-grey-text-contrast bg-grey-bg shadow outline-none transition-colors',
          'hover:bg-grey-bg-hover',
          'active:bg-grey-bg-active',
          'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
          'grou-data-[disabled]:border-grey-line grou-data-[disabled]:cursor-not-allowed disabled:bg-grey-bg-subtle group-data-[disabled]:cursor-not-allowed',
        )}
      />
    </Root>
  ),
);

Slider.displayName = Root.displayName;
