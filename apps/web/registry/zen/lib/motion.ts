'use client';

import { type MotionProps, useReducedMotion } from 'motion/react';
import { type KeyboardEvent, useCallback, useMemo, useState } from 'react';

/** The spring presets and press scale every animated component references. */
export const motionTokens = {
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

export type ControllableOpenOptions<Details = undefined> = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: Details) => void;
  open?: boolean;
};

export type ControllableOpen<Details = undefined> = {
  open: boolean;
  setOpen: (open: boolean, details: Details) => void;
};

/**
 * Resolve a popup's `open` prop against its uncontrolled default, forwarding
 * every change to the caller without altering the component's public API.
 */
export function useControllableOpen<Details = undefined>(
  options: ControllableOpenOptions<Details> = {}
): ControllableOpen<Details> {
  const { defaultOpen = false, onOpenChange, open } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean, details: Details) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen, details);
    },
    [isControlled, onOpenChange]
  );

  return { open: resolvedOpen, setOpen };
}
