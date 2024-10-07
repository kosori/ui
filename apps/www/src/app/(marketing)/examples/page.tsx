import type { NextPage } from 'next';
import { clsx } from 'clsx/lite';

const Examples: NextPage = () => {
  return (
    <div className='container'>
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

      <div className='aspect-video overflow-hidden rounded-lg border'>
        <iframe
          className='size-full'
          loading='lazy'
          src='/examples/faqs'
          title='FAQs'
        />
      </div>
    </div>
  );
};

export default Examples;
