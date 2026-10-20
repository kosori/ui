import { cn } from 'cn';
import type React from 'react';

type Props = React.ComponentProps<'div'> & {
  /** The width-to-height ratio the box keeps, `16 / 9` by default. */
  ratio?: number;
};

export function AspectRatio({
  className,
  ratio = 16 / 9,
  style,
  ...props
}: Props): React.ReactElement {
  return (
    <div
      className={cn('relative w-full', className)}
      data-slot='aspect-ratio'
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  );
}
