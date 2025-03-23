import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const InputInvalidDemo = () => {
  return (
    <div className='grid w-full max-w-xs items-center gap-1.5'>
      <Label className='text-error-solid' htmlFor='email'>
        Email
      </Label>
      <Input
        aria-invalid
        defaultValue='invalid@mail.com'
        id='email'
        placeholder='Email'
        type='email'
      />
      <p className='text-sm font-medium text-error-solid'>
        This email is invalid.
      </p>
    </div>
  );
};
