'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { cn } from 'cn';
import type { HTMLMotionProps } from 'motion/react';
import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

import { motionTokens } from '@/lib/motion';

export function Slider({
  className,
  getAriaLabel,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props &
  Pick<SliderPrimitive.Thumb.Props, 'getAriaLabel'>): React.ReactElement {
  const reduce = useReducedMotion();
  const { press } = motionTokens;
  const _values = useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      className={cn('data-[orientation=horizontal]:w-full', className)}
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment='edge'
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className='flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64'
        data-slot='slider-control'
      >
        <SliderPrimitive.Track
          className='relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5'
          data-slot='slider-track'
        >
          <SliderPrimitive.Indicator
            className='select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5'
            data-slot='slider-indicator'
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className='block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 motion-reduce:transition-none sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none'
              data-slot='slider-thumb'
              getAriaLabel={getAriaLabel}
              index={index}
              key={String(index)}
              // biome-ignore lint/performance/noJsxPropsBind: Base UI's render prop receives the thumb state
              render={(thumbProps, state) => (
                <motion.div
                  {...(thumbProps as HTMLMotionProps<'div'>)}
                  animate={{
                    scale: reduce ? 1 : state.dragging ? 1.2 : 1,
                  }}
                  initial={false}
                  transition={{
                    scale: state.dragging ? press.down : press.up,
                  }}
                />
              )}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn('flex justify-end text-sm', className)}
      data-slot='slider-value'
      {...props}
    />
  );
}

const Primitive = SliderPrimitive;

export { Primitive as SliderPrimitive };
