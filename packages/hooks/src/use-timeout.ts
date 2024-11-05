import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '@kosori/hooks/use-isomorphic-layout-effect';

/**
 * A custom hook that sets a timeout to execute a callback function after a specified delay.
 *
 * @param {() => void} [callback] - The function to be executed after the delay.
 * @param {number | null} [delay] - The time in milliseconds to wait before executing the callback. If null, the timeout will not be set.
 *
 * @example
 * const [count, setCount] = useState(0);
 * useTimeout(() => {
 *   setCount(count + 1);
 * }, 1000); // Increments count every second
 *
 * @returns {void} This hook does not return any value.
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
};
