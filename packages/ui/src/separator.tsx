'use client';

import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-separator';

import { cn } from '@kosori/ui';

type SeparatorRef = React.ElementRef<typeof Root>;
type SeparatorProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * Separator component that visually divides content.
 *
 * @param {SeparatorProps} props - The props for the Separator component.
 * @param {string} [orientation='horizontal'] - The orientation of the separator, either 'horizontal' or 'vertical'.
 * @param {boolean} [decorative=true] - Indicates whether the separator is decorative.
 *
 * @example
 * <Separator />
 *
 * @see {@link https://dub.sh/ui-separator Separator Docs} for further information.
 */

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
