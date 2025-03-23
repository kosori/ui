import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import { Input } from '@kosori/ui/input';

export const InputEndIconDemo = () => {
  return (
    <div className='relative'>
      <Input
        className='peer w-full max-w-xs pe-9'
        placeholder='Email'
        type='email'
      />

      <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-grey-text peer-disabled:text-grey-solid'>
        <EnvelopeClosedIcon aria-hidden='true' className='size-4' />
      </div>
    </div>
  );
};
