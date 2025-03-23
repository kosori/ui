import { Input } from '@kosori/ui/input';

export const InputDisabledDemo = () => {
  return (
    <Input
      disabled
      className='w-full max-w-xs'
      placeholder='Email'
      type='email'
    />
  );
};
