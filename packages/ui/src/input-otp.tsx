import { forwardRef, useContext } from 'react';
import { DashIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { OTPInput, OTPInputContext } from 'input-otp';
import { tv } from 'tailwind-variants';

const inputOTPStyles = tv({
  slots: {
    base: 'flex items-center gap-2',
    group: 'flex items-center',
    slot: clsx(
      'relative flex size-9 items-center justify-center border-y border-r border-grey-border text-sm shadow-sm transition-all',
      'first:rounded-l-lg first:border-l',
      'last:rounded-r-lg',
    ),
    slotFakeCaretWraper:
      'pointer-events-none absolute inset-0 flex items-center justify-center',
    slotFakeCaret:
      'h-4 w-px animate-caret-blink bg-grey-text-contrast duration-1000',
  },
  variants: {
    active: {
      true: {
        slot: 'z-10 ring-3 ring-grey-focus-ring',
      },
    },
  },
});

const { base, group, slot, slotFakeCaretWraper, slotFakeCaret } =
  inputOTPStyles();

type InputOTPRef = React.ElementRef<typeof OTPInput>;
type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>;

/**
 * InputOTP component that renders an OTP input field.
 *
 * @param {InputOTPProps} props - The props for the InputOTP component.
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @see {@link https://dub.sh/ui-input-otp InputOTP Docs} for further information.
 */
export const InputOTP = forwardRef<InputOTPRef, InputOTPProps>(
  ({ containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={base({ class: containerClassName })}
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
 * ```tsx
 * <InputOTPGroup>
 *   {Your input slots here}
 * </InputOTPGroup>
 * ```
 */
export const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={group({ className })} {...props} />
  ),
);

InputOTPGroup.displayName = 'InputOTPGroup';

type InputOTPSlotRef = React.ElementRef<'div'>;
type InputOTPSlotProps = React.ComponentPropsWithoutRef<'div'> & {
  index: number;
};

/**
 * InputOTPSlot component that represents a single slot in the OTP input.
 *
 * @param {InputOTPSlotProps} props - The props for the InputOTPSlot component.
 *
 * @example
 * ```tsx
 * <InputOTPSlot />
 * ```
 */
export const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    if (!inputOTPContext.slots[index]) return null;
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={slot({ className, active: isActive })}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className={slotFakeCaretWraper()}>
            <div className={slotFakeCaret()} />
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
 * ```tsx
 * <InputOTPSeparator />
 * ```
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
