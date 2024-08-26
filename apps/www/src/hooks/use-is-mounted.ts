import { useCallback, useEffect, useRef } from 'react';

/**
 * A custom hook that provides a way to check if a component is currently mounted.
 *
 * @returns An object containing a function `isMounted` that returns a boolean
 */
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isMounted: useCallback(() => isMounted.current, []) };
};
