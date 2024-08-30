import type { NextPage } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';

const Examples: NextPage = () => {
  return (
    <main className='flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-3 p-8'>
      <h1
        className={clsx(
          'bg-gradient-to-b from-grey-text-contrast to-grey-text bg-clip-text text-center text-4xl font-medium text-transparent',
          'md:text-5xl',
          'lg:text-6xl',
        )}
      >
        Coming Soon
      </h1>
      <h2
        className={clsx(
          'text-center text-lg text-grey-text',
          'sm:text-xl',
          'md:text-2xl',
        )}
      >
        In the meantime, check out some of the components already available.
      </h2>

      <div className='mt-6 flex gap-4'>
        <Button asChild>
          <Link href='/docs/ui/components'>Browse components</Link>
        </Button>
      </div>
    </main>
  );
};

export default Examples;
