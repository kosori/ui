'use client';

import { forwardRef } from 'react';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const sliderStyles = tv({
  slots: {
    base: 'group relative flex w-full touch-none select-none items-center',
    track: clsx(
      'relative h-1.5 w-full grow cursor-pointer overflow-hidden rounded-full bg-grey-bg',
      'group-data-[disabled]:cursor-not-allowed',
    ),
    range: clsx(
      'absolute h-full bg-grey-text-contrast',
      'group-data-[disabled]:cursor-not-allowed',
    ),
    thumb: clsx(
      'block h-4 w-4 cursor-pointer rounded-full border-2 border-grey-text-contrast bg-grey-bg shadow outline-none transition-colors',
      'hover:bg-grey-bg-hover',
      'active:bg-grey-bg-active',
      'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'grou-data-[disabled]:border-grey-line grou-data-[disabled]:cursor-not-allowed disabled:bg-grey-bg-subtle group-data-[disabled]:cursor-not-allowed',
    ),
  },
});

const { base, track, range, thumb } = sliderStyles();

type SliderRef = React.ElementRef<typeof Root>;
type SliderProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * Slider component that allows users to select a value from a range.
 *
 * @param {SliderProps} props - The props for the Slider component.
 *
 * @example
 * ```tsx
 * <Slider defaultValue={[33]} max={100} step={1} />
 * ```
 *
 * @see {@link https://dub.sh/ui-slider Slider Docs} for further information.
 */
export const Slider = forwardRef<SliderRef, SliderProps>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props}>
      <Track className={track()}>
        <Range className={range()} />
      </Track>

      <Thumb className={thumb()} />
    </Root>
  ),
);

Slider.displayName = Root.displayName;
