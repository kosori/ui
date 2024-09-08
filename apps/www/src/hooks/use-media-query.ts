import { useState } from 'react';

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';

type Props = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

/**
 * A custom hook that returns the current match status of a given media query.
 *
 * @param {string} [query] - The media query string to evaluate.
 * @param {Props} [options={}] - Configuration options for the hook.
 * @param {Props['defaultValue']} [options.defaultValue] - The default value used on the server.
 * @param {Props['initializeWithValue']} [options.initializeWithValue] - If `true`, the hook initializes with the media query's match status on the first render.
 *
 * @returns A boolean indicating whether the media query currently matches.
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const isTablet = useMediaQuery('(max-width: 767px)');
 */
export const useMediaQuery = (
  query: string,
  { defaultValue = false, initializeWithValue = true }: Props = {},
) => {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => setMatches(getMatches(query));
    handleChange();

    // Safari < 14 compatibility with addListener/removeListener
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
};
