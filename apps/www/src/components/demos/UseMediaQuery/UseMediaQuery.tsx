'use client';

import { useMediaQuery } from '~/hooks/use-media-query';

export const UseMediaQueryDemo = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      <p>The current viewport is {isDesktop ? 'desktop' : 'mobile'}</p>
    </div>
  );
};
