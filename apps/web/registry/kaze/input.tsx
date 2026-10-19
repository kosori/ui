import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from 'cn';
import type * as React from 'react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      className={cn(
        'h-10 w-full min-w-0 rounded-lg border border-input/70 bg-transparent px-3 py-1.5 text-base outline-none transition-colors file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80',
        className
      )}
      data-slot='input'
      type={type}
      {...props}
    />
  );
}

export { Input };
