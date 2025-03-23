import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import { Input } from '@kosori/ui/input';

export const InputStartIconDemo = () => {
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-grey-text peer-disabled:text-grey-solid'>
        <EnvelopeClosedIcon aria-hidden='true' className='size-4' />
      </div>

      <Input
        className='peer w-full max-w-xs ps-9'
        placeholder='Email'
        type='email'
      />
    </div>
  );
};
