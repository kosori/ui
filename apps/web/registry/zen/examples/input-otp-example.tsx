import { Field, FieldLabel } from '@/components/ui/field';
import { OTPField, OTPFieldInput } from '@/components/ui/input-otp';

const OTP_LENGTH = 6;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`
);

const InputOtpExample = () => (
  <Field>
    <FieldLabel className='sr-only'>One-time password</FieldLabel>
    <OTPField length={OTP_LENGTH}>
      {OTP_SLOT_KEYS.map((slotKey, index) => (
        <OTPFieldInput
          aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
          key={slotKey}
        />
      ))}
    </OTPField>
  </Field>
);

export default InputOtpExample;
