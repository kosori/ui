'use client';

import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-separator';
import { tv } from 'tailwind-variants';

const separatorStyles = tv({
  base: 'shrink-0 bg-grey-line',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
});

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
      className={separatorStyles({ className, orientation })}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  ),
);

Separator.displayName = Root.displayName;
