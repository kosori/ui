'use client';

import { cn } from 'cn';
import {
  AnimatePresence,
  type HTMLMotionProps,
  type MotionProps,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  type ComponentProps,
  createContext,
  createElement,
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

/** The spring presets and press feedback every animated component references. */
export const motionTokens = {
  press: {
    down: { duration: 0.1, ease: [0.2, 0, 0, 1] as const },
    up: { duration: 0.16, ease: [0.2, 0, 0, 1] as const },
  },
  pressScale: 0.97,
  spring: {
    gentle: { damping: 34, stiffness: 340 },
    morph: { bounce: 0, visualDuration: 0.42 },
    responsive: { damping: 44, stiffness: 520 },
    smooth: { bounce: 0, visualDuration: 0.4 },
    snappy: { bounce: 0, visualDuration: 0.26 },
  },
} as const;

export type MotionPreset = keyof typeof motionTokens.spring;

/**
 * Resolve a spring preset, collapsing to an instant change when the user
 * prefers reduced motion so every animation reads the same preference.
 */
export function useMotionTransition(
  preset: MotionPreset
): NonNullable<MotionProps['transition']> {
  const reduce = useReducedMotion();

  return reduce ? { duration: 0 } : motionTokens.spring[preset];
}

export type KeyboardPress = {
  handlers: {
    onBlurCapture: () => void;
    onKeyDownCapture: (event: KeyboardEvent<HTMLElement>) => void;
    onKeyUpCapture: (event: KeyboardEvent<HTMLElement>) => void;
  };
  pressed: boolean;
};

/**
 * Track Space activation so a keyboard press gets the same feedback as a
 * pointer press, which Motion's `whileTap` already covers along with Enter.
 */
export function useKeyboardPress(): KeyboardPress {
  const [pressed, setPressed] = useState(false);
  const handlers = useMemo(
    () => ({
      onBlurCapture: () => setPressed(false),
      onKeyDownCapture: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ') {
          setPressed(true);
        }
      },
      onKeyUpCapture: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ') {
          setPressed(false);
        }
      },
    }),
    []
  );

  return { handlers, pressed };
}

export type PressFeedback = Pick<
  HTMLMotionProps<'button'>,
  'animate' | 'initial' | 'transition' | 'whileTap'
> &
  KeyboardPress['handlers'];

/**
 * Resolve the press feedback a Button or Toggle spreads onto its
 * `motion.button`, leaving a popup trigger still so its positioning holds.
 */
export function usePressFeedback(hasPopup: boolean): PressFeedback {
  const reduce = useReducedMotion();
  const keyboard = useKeyboardPress();
  const enabled = !(reduce || hasPopup);
  const { press } = motionTokens;

  return {
    ...(enabled
      ? {
          animate: {
            scale: keyboard.pressed ? motionTokens.pressScale : 1,
            transition: keyboard.pressed ? press.down : press.up,
          },
          initial: false,
        }
      : {}),
    ...keyboard.handlers,
    transition: press.up,
    whileTap: enabled
      ? { scale: motionTokens.pressScale, transition: press.down }
      : undefined,
  };
}

export type MotionPanelProps = ComponentProps<typeof motion.div> & {
  'data-open'?: string;
};

/**
 * Spring a panel between its measured height and zero, releasing the clip once
 * it settles open so nested content is not cut off.
 */
export function MotionPanel({
  className,
  ...props
}: MotionPanelProps): ReactElement {
  const reduce = useReducedMotion();
  const transition = useMotionTransition('smooth');
  const open = props['data-open'] !== undefined;
  const [settledOpen, setSettledOpen] = useState(open);
  const clipped = !(open && (reduce || settledOpen));
  const handleAnimationStart = useCallback(() => setSettledOpen(false), []);
  const handleAnimationComplete = useCallback(
    () => setSettledOpen(open),
    [open]
  );

  return createElement(motion.div, {
    ...props,
    animate: { height: open ? 'auto' : 0 },
    'aria-hidden': open ? undefined : true,
    className: cn(clipped ? 'overflow-hidden' : 'overflow-visible', className),
    inert: open ? undefined : true,
    initial: false,
    onAnimationComplete: handleAnimationComplete,
    onAnimationStart: handleAnimationStart,
    transition,
  });
}

export type OverlayPresence = {
  keepMounted: boolean;
  wrap: (popup: ReactElement) => ReactElement;
};

/**
 * Create the open context a Motion popup shares with its Root, together with
 * the presence helper that keeps the portal mounted until the exit ends.
 */
export function createOverlayPresence() {
  const OpenContext = createContext<boolean | null>(null);

  const usePresence = (): OverlayPresence => {
    const open = useContext(OpenContext);

    return {
      keepMounted: open !== null,
      wrap: (popup) =>
        open === null
          ? popup
          : createElement(AnimatePresence, null, open ? popup : null),
    };
  };

  return { Provider: OpenContext.Provider, usePresence };
}

export type OpenChangeDetails = { isCanceled?: boolean };

export type ControllableOpenOptions<
  Details extends OpenChangeDetails = OpenChangeDetails,
> = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: Details) => void;
  open?: boolean;
};

export type ControllableOpen<
  Details extends OpenChangeDetails = OpenChangeDetails,
> = {
  open: boolean;
  setOpen: (open: boolean, details: Details) => void;
};

/**
 * Resolve a popup's `open` prop against its uncontrolled default, forwarding
 * every change to the caller and honouring a cancelled change without altering
 * the component's public API.
 */
export function useControllableOpen<
  Details extends OpenChangeDetails = OpenChangeDetails,
>(options: ControllableOpenOptions<Details> = {}): ControllableOpen<Details> {
  const { defaultOpen = false, onOpenChange, open } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean, details: Details) => {
      onOpenChange?.(nextOpen, details);

      if (details.isCanceled) {
        return;
      }

      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
    },
    [isControlled, onOpenChange]
  );

  return { open: resolvedOpen, setOpen };
}
