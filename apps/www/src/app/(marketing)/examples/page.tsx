import type { NextPage } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { Badge } from '@kosori/ui/badge';

const Examples: NextPage = () => {
  return (
    <div className='container pb-6'>
      <main className='flex max-w-screen-lg flex-col gap-3 py-12'>
        <h1
          className={clsx(
            'bg-gradient-to-b from-grey-text-contrast to-grey-text bg-clip-text text-4xl font-medium text-transparent',
            'md:text-5xl',
            'lg:text-6xl',
          )}
        >
          UI Examples
        </h1>
        <h2
          className={clsx(
            'text-lg text-grey-text',
            'sm:text-xl',
            'md:text-2xl',
          )}
        >
          Examples using the components available in Kõsori. Use them as a
          reference or as a starting point for your own project.
        </h2>
      </main>

      <div>
        <h3 className='text-xl font-semibold text-grey-text-contrast'>FAQs</h3>
        <div className='mb-6 flex gap-2'>
          <Link href='/docs/ui/accordion'>
            <Badge size='small' variant='outline'>
              Accordion
            </Badge>
          </Link>
          <Link href='/docs/ui/button'>
            <Badge size='small' variant='outline'>
              Button
            </Badge>
          </Link>
          <Link href='/docs/ui/card'>
            <Badge size='small' variant='outline'>
              Card
            </Badge>
          </Link>
          <Link href='/docs/ui/input'>
            <Badge size='small' variant='outline'>
              Input
            </Badge>
          </Link>
          <Link href='/docs/ui/navigation-menu'>
            <Badge size='small' variant='outline'>
              Navigation Menu
            </Badge>
          </Link>
        </div>

        <div className='aspect-video resize overflow-auto rounded-lg border'>
          <iframe
            className='size-full'
            loading='lazy'
            src='/examples/faqs'
            title='FAQs'
          />
        </div>
      </div>
    </div>
  );
};

export default Examples;
