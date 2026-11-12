'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from 'cn';
import type { HTMLMotionProps } from 'motion/react';
import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useState } from 'react';

import { useKeyboardPress, useMotionTransition } from '@/lib/motion';

/**
 * The thumb's resting and travelling distance. The trailing `--switch-dir`
 * mirrors it for a right-to-left layout without measuring the thumb.
 */
const restTravel = 'calc((0% - 0px) * var(--switch-dir, 1))';
const checkedTravel = 'calc((100% - 4px) * var(--switch-dir, 1))';

export function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props): React.ReactElement {
  const reduce = useReducedMotion();
  const transition = useMotionTransition('snappy');
  const keyboard = useKeyboardPress();
  const [tapped, setTapped] = useState(false);
  const endTap = useCallback(() => setTapped(false), []);
  const startTap = useCallback(() => setTapped(true), []);
  const pressed = !reduce && (tapped || keyboard.pressed);

  return (
    <SwitchPrimitive.Root
      className={cn(
        'inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-[var(--duration-fast,160ms)] ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] [--switch-dir:1] [--thumb-size:--spacing(5)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 motion-reduce:transition-none sm:[--thumb-size:--spacing(4)] rtl:[--switch-dir:-1]',
        className
      )}
      data-slot='switch'
      {...props}
      // biome-ignore lint/performance/noJsxPropsBind: Base UI's render prop receives the root state
      render={(rootProps) => (
        <motion.span
          {...(rootProps as HTMLMotionProps<'span'>)}
          {...keyboard.handlers}
          onTap={endTap}
          onTapCancel={endTap}
          onTapStart={startTap}
        />
      )}
    >
      <SwitchPrimitive.Thumb
        className='pointer-events-none block aspect-square h-full origin-left rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform data-checked:origin-[var(--thumb-size)_50%] rtl:origin-right rtl:data-checked:origin-left'
        data-slot='switch-thumb'
        // biome-ignore lint/performance/noJsxPropsBind: Base UI's render prop receives the thumb state
        render={(thumbProps, state) => (
          <motion.span
            {...(thumbProps as HTMLMotionProps<'span'>)}
            animate={{
              scaleX: pressed && !state.disabled ? 1.1 : 1,
              x: state.checked ? checkedTravel : restTravel,
            }}
            initial={false}
            transition={transition}
          />
        )}
      />
    </SwitchPrimitive.Root>
  );
}

const Primitive = SwitchPrimitive;

export { Primitive as SwitchPrimitive };
