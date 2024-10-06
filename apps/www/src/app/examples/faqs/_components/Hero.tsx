import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';

import { Input } from '@kosori/ui/input';

export const Hero = () => {
  return (
    <div className='max-w-container mx-auto mt-10 px-6 pb-6'>
      <h1
        className={clsx(
          'text-2xl font-bold text-grey-text-contrast',
          'sm:text-3xl',
          'md:text-4xl',
        )}
      >
        Support &amp; Documentation
      </h1>

      <div className='relative mt-4 max-w-xs'>
        <MagnifyingGlassIcon className='absolute left-2 top-1/2 -translate-y-1/2 text-grey-text-contrast' />
        <Input className='pl-7' id='search' placeholder='Search' />
      </div>
    </div>
  );
};
