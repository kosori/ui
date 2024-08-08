'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@kosori/ui/input-otp';

export const InputOTPSeparatorDemo = () => {
  return (
    <InputOTP
      maxLength={6}
      render={({ slots }) => (
        <>
          <InputOTPGroup>
            {slots.slice(0, 2).map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {slots.slice(2, 4).map((slot, index) => (
              <InputOTPSlot key={index + 2} {...slot} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {slots.slice(4).map((slot, index) => (
              <InputOTPSlot key={index + 4} {...slot} />
            ))}
          </InputOTPGroup>
        </>
      )}
    />
  );
};
