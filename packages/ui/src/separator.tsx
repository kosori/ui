'use client';

import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-separator';

import { cn } from '@kosori/ui';

// --- Component:Separator ---
type SeparatorRef = React.ElementRef<typeof Root>;
type SeparatorProps = React.ComponentPropsWithoutRef<typeof Root>;

export const Separator = forwardRef<SeparatorRef, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <Root
      ref={ref}
      className={cn(
        'shrink-0 bg-grey-line',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  ),
);

Separator.displayName = Root.displayName;
