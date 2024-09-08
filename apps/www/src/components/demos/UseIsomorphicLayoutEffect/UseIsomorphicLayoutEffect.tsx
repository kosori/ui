'use client';

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';

export const UseIsomorphicLayoutEffectDemo = () => {
  useIsomorphicLayoutEffect(() => {
    console.log(
      "In the browser, I'm an `useLayoutEffect`, but in SSR I'm an `useEffect`",
    );
  }, []);

  return (
    <div>
      <p>Check the console</p>
    </div>
  );
};
