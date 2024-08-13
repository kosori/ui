import type { SlotProps } from 'input-otp';
import { forwardRef } from 'react';
import { DashIcon } from '@radix-ui/react-icons';
import { OTPInput } from 'input-otp';

import { cn } from '@kosori/ui';

type InputOTPRef = React.ElementRef<typeof OTPInput>;
type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

/**
 * InputOTP component that renders an OTP input field.
 *
 * @param {InputOTPProps} props - The props for the InputOTP component.
 *
 * @example
 * <InputOTP
 *   maxLength={6}
 *   render={({ slots }) => (
 *     <>
 *       <InputOTPGroup>
 *         {slots.slice(0, 3).map((slot, index) => (
 *           <InputOTPSlot key={index} {...slot} />
 *         ))}
 *       </InputOTPGroup>
 *       <InputOTPSeparator />
 *       <InputOTPGroup>
 *         {slots.slice(3).map((slot, index) => (
 *           <InputOTPSlot key={index + 3} {...slot} />
 *         ))}
 *       </InputOTPGroup>
 *     </>
 *   )}
 * />
 *
 * @see {@link https://dub.sh/ui-input-otp InputOTP Docs} for further information.
 */
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

type InputOTPGroupRef = React.ElementRef<'div'>;
type InputOTPGroupProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * InputOTPGroup component that wraps a group of OTP input slots.
 *
 * @param {InputOTPGroupProps} props - The props for the InputOTPGroup component.
 *
 * @example
 * <InputOTPGroup>
 *   {Your input slots here}
 * </InputOTPGroup>
 */
export const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  ),
);

InputOTPGroup.displayName = 'InputOTPGroup';

type InputOTPSlotRef = React.ElementRef<'div'>;
type InputOTPSlotProps = SlotProps & React.ComponentPropsWithoutRef<'div'>;

/**
 * InputOTPSlot component that represents a single slot in the OTP input.
 *
 * @param {InputOTPSlotProps} props - The props for the InputOTPSlot component.
 *
 * @example
 * <InputOTPSlot />
 */
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

type InputOTPSeparatorRef = React.ElementRef<'div'>;
type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * InputOTPSeparator component that visually separates OTP input groups.
 *
 * @param {InputOTPSeparatorProps} props - The props for the InputOTPSeparator component.
 *
 * @example
 * <InputOTPSeparator />
 */
export const InputOTPSeparator = forwardRef<
  InputOTPSeparatorRef,
  InputOTPSeparatorProps
>(({ ...props }, ref) => (
  <div ref={ref} role='separator' {...props}>
    <DashIcon />
  </div>
));

InputOTPSeparator.displayName = 'InputOTPSeparator';
