import type { SlotProps } from 'input-otp';
import { forwardRef } from 'react';
import { DashIcon } from '@radix-ui/react-icons';
import { OTPInput } from 'input-otp';

import { cn } from '@kosori/ui';

// --- Component:InputOTP ---
type InputOTPRef = React.ElementRef<typeof OTPInput>;
type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

export const InputOTP = forwardRef<InputOTPRef, InputOTPProps>(
  ({ className, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn('flex items-center gap-2', className)}
      {...props}
    />
  ),
);

InputOTP.displayName = 'InputOTP';

// --- Component:InputOTPGroup ---
type InputOTPGroupRef = React.ElementRef<'div'>;
type InputOTPGroupProps = React.ComponentPropsWithoutRef<'div'>;

export const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  ),
);

InputOTPGroup.displayName = 'InputOTPGroup';

// --- Component:InputOTPSlot ---
type InputOTPSlotRef = React.ElementRef<'div'>;
type InputOTPSlotProps = SlotProps & React.ComponentPropsWithoutRef<'div'>;

export const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center border-y border-r border-grey-border text-sm shadow-sm transition-all',
          'first:rounded-l-md first:border-l',
          'last:rounded-r-md',
          isActive && 'z-10 ring-4 ring-grey-focus-ring',
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <div className='h-4 w-px animate-caret-blink bg-grey-text-contrast duration-1000' />
          </div>
        )}
      </div>
    );
  },
);

InputOTPSlot.displayName = 'InputOTPSlot';

// --- Component:InputOTPSeparator ---
type InputOTPSeparatorRef = React.ElementRef<'div'>;
type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<'div'>;

export const InputOTPSeparator = forwardRef<
  InputOTPSeparatorRef,
  InputOTPSeparatorProps
>(({ ...props }, ref) => (
  <div ref={ref} role='separator' {...props}>
    <DashIcon />
  </div>
));

InputOTPSeparator.displayName = 'InputOTPSeparator';
