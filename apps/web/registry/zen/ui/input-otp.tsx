'use client';

import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { cn } from 'cn';
import type * as React from 'react';
import { createContext, useContext } from 'react';
import { Separator } from '@/components/ui/separator';

const rootClassName =
  'flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!';

const inputClassName =
  'relative in-[[data-slot=otp-field][data-size=lg]]:size-10 size-9 min-w-0 rounded-lg border border-input bg-background not-dark:bg-clip-padding text-center in-[[data-slot=otp-field][data-size=lg]]:text-lg text-base text-foreground in-[[data-slot=otp-field][data-size=lg]]:leading-10 leading-9 shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-focus-visible:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:z-10 focus-visible:border-ring focus-visible:shadow-none focus-visible:ring-[3px] focus-visible:ring-ring/24 aria-invalid:border-destructive/36 aria-invalid:shadow-none aria-invalid:focus-visible:border-destructive/64 aria-invalid:focus-visible:ring-destructive/16 sm:in-[[data-slot=otp-field][data-size=lg]]:size-9 sm:size-8 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base sm:text-sm sm:in-[[data-slot=otp-field][data-size=lg]]:leading-9 sm:leading-8 dark:bg-input/32 dark:aria-invalid:focus-visible:ring-destructive/24 dark:not-focus-visible:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]';

const InputOTPLengthContext = createContext<number | null>(null);

export function OTPField({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: 'default' | 'lg';
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn(rootClassName, className)}
      data-size={size}
      data-slot='otp-field'
      {...props}
    />
  );
}

export function OTPFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Input>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cn(inputClassName, className)}
      data-slot='otp-field-input'
      spellCheck={false}
      {...props}
    />
  );
}

export function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <Separator
      className={cn(
        'rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3',
        className
      )}
      orientation='horizontal'
      {...props}
    />
  );
}

export type InputOTPProps = Omit<
  React.ComponentProps<typeof OTPFieldPrimitive.Root>,
  'length' | 'onValueChange' | 'onValueComplete'
> & {
  containerClassName?: string;
  maxLength: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

/**
 * shadcn/ui's `InputOTP`: a field of `maxLength` segments, composed from
 * `InputOTPGroup` and indexed `InputOTPSlot` children.
 */
export function InputOTP({
  className,
  containerClassName,
  maxLength,
  onChange,
  onComplete,
  ...props
}: InputOTPProps): React.ReactElement {
  return (
    <InputOTPLengthContext.Provider value={maxLength}>
      <OTPFieldPrimitive.Root
        className={cn(rootClassName, containerClassName, className)}
        data-slot='otp-field'
        length={maxLength}
        onValueChange={onChange}
        onValueComplete={onComplete}
        {...props}
      />
    </InputOTPLengthContext.Provider>
  );
}

/** A run of adjacent `InputOTPSlot`s, spaced the way coss/ui spaces segments. */
export function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-slot='input-otp-group'
      {...props}
    />
  );
}

export type InputOTPSlotProps = React.ComponentProps<
  typeof OTPFieldPrimitive.Input
> & {
  index: number;
};

/**
 * The OTP segment at `index`. Base UI derives segment order from document
 * position, so slots must be rendered in index order.
 */
export function InputOTPSlot({
  className,
  index,
  ...props
}: InputOTPSlotProps): React.ReactElement {
  const length = useContext(InputOTPLengthContext);
  const label =
    index === 0
      ? undefined
      : `Character ${index + 1}${length === null ? '' : ` of ${length}`}`;

  return (
    <OTPFieldPrimitive.Input
      aria-label={label}
      className={cn(inputClassName, className)}
      data-slot='otp-field-input'
      spellCheck={false}
      {...props}
    />
  );
}

/** The divider between two `InputOTPGroup`s. */
export function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return <OTPFieldSeparator className={className} {...props} />;
}

const Primitive = OTPFieldPrimitive;

export { Primitive as OTPFieldPrimitive };
