import { IconSelector } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type React from 'react';

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'default';
};

const nativeSelectVariants = cva(
  'min-h-9 w-full min-w-0 select-none appearance-none rounded-lg border border-input bg-background not-dark:bg-clip-padding ps-[calc(--spacing(3)-1px)] pe-8 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24',
  {
    defaultVariants: {
      size: 'default',
    },
    variants: {
      size: {
        default: '',
        sm: 'min-h-8 ps-[calc(--spacing(2.5)-1px)] sm:min-h-7',
      },
    },
  }
);

export function NativeSelect({
  className,
  size = 'default',
  ...props
}: NativeSelectProps): React.ReactElement {
  return (
    <div
      className={cn(
        'relative w-fit has-[select:disabled]:opacity-64',
        className
      )}
      data-size={size}
      data-slot='native-select-wrapper'
    >
      <select
        className={nativeSelectVariants({ size })}
        data-size={size}
        data-slot='native-select'
        {...props}
      />
      <IconSelector
        aria-hidden='true'
        className='pointer-events-none absolute end-[calc(--spacing(3)-1px)] top-1/2 size-4.5 -translate-y-1/2 select-none text-muted-foreground sm:size-4'
        data-slot='native-select-icon'
      />
    </div>
  );
}

export function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<'option'>): React.ReactElement {
  return (
    <option
      className={cn('bg-popover text-foreground', className)}
      data-slot='native-select-option'
      {...props}
    />
  );
}

export function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>): React.ReactElement {
  return (
    <optgroup
      className={cn('bg-popover text-foreground', className)}
      data-slot='native-select-optgroup'
      {...props}
    />
  );
}
