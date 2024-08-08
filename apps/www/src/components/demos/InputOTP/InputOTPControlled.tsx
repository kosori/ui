'use client';

import { useState } from 'react';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@kosori/ui/input-otp';

export const InputOTPControlledDemo = () => {
  const [value, setValue] = useState('');

  return (
    <div className='space-y-2'>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
          </>
        )}
      />
      <div className='text-center text-sm text-grey-text'>
        {value === '' ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  );
};
