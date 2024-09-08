import { useEffect, useLayoutEffect } from 'react';

/**
 * A custom hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 *
 * @param {React.EffectCallback} [effect] - The function that contains the side-effect logic.
 * @param {React.DependencyList} [deps] - An optional array of dependencies that, when changed, will re-run the effect.
 *
 * @returns `void`
 *
 * @example
 * import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';
 * useIsomorphicLayoutEffect(() => {
 *   console.log(
 *     "In the browser, I'm an `useLayoutEffect`, but in SSR, I'm an `useEffect`.",
 *   );
 * }, []);
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
