'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { Accordions } from './_components/Accordions';
import { Cards } from './_components/Cards';
import { Footer } from './_components/Footer';
import { Header } from './_components/Header';
import { Hero } from './_components/Hero';

const Faqs: NextPage = () => {
  return (
    <div className={clsx('p-2', 'sm:p-4', 'md:p-6')}>
      <div className='max-w-container dark mx-auto rounded-lg border bg-grey-bg-subtle'>
        <Header />
        <Hero />
      </div>

      <div className={clsx('max-w-container mx-auto px-2 pt-14', 'sm:px-6')}>
        <h2
          className={clsx(
            'text-xl font-semibold text-grey-text-contrast',
            'sm:text-2xl',
            'md:text-3xl',
          )}
        >
          Advice and answers
        </h2>
        <p>Everything you need to know about the product and how it works.</p>

        <div
          className={clsx(
            'mt-10 grid grid-cols-1 gap-6',
            'min-[500px]:grid-cols-2',
            'lg:grid-cols-4',
          )}
        >
          <Cards />
        </div>
      </div>

      <div
        className={clsx(
          'max-w-container mx-auto grid grid-cols-1 gap-6 px-2 pt-20',
          'sm:px-6',
          'md:grid-cols-2',
        )}
      >
        <div>
          <h2 className='text-3xl font-semibold text-grey-text-contrast'>
            General FAQs
          </h2>
          <p>
            Can't find an answer? Please{' '}
            <Link
              className={clsx('text-primary-solid', 'hover:underline')}
              href='#'
            >
              chat with us
            </Link>
          </p>
        </div>

        <div>
          <Accordions />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Faqs;
