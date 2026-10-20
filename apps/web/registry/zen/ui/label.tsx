import { cn } from 'cn';
import type React from 'react';

export function Label({
  className,
  ...props
}: React.ComponentProps<'label'>): React.ReactElement {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Label forwards htmlFor from its consumer
    <label
      className={cn(
        'inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4',
        className
      )}
      data-slot='label'
      {...props}
    />
  );
}
