'use client';

import {
  DirectionProvider as DirectionProviderPrimitive,
  useDirection as useDirectionPrimitive,
} from '@base-ui/react/direction-provider';
import type React from 'react';

type Props = DirectionProviderPrimitive.Props & {
  /** The shadcn/ui spelling of `direction`, accepted alongside it. */
  dir?: DirectionProviderPrimitive.Props['direction'];
};

export function DirectionProvider({
  children,
  dir,
  direction,
}: Props): React.ReactElement {
  return (
    <DirectionProviderPrimitive direction={direction ?? dir}>
      {children}
    </DirectionProviderPrimitive>
  );
}

/** Read the direction the nearest DirectionProvider supplies. */
export const useDirection = useDirectionPrimitive;
