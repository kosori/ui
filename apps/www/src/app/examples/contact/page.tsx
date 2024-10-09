'use client';

import type { NextPage } from 'next';
import { clsx } from 'clsx/lite';

import { Separator } from '@kosori/ui/separator';

import { Footer } from './_components/Footer';
import { ContactForm } from './_components/Form';
import { Header } from './_components/Header';
import { Hero } from './_components/Hero';

const Contact: NextPage = () => {
  return (
    <div className={clsx('p-2', 'sm:p-4', 'md:p-6')}>
      <Header />

      <main
        className={clsx(
          'mx-auto my-6 grid max-w-screen-lg grid-cols-1 gap-0 px-0',
          'sm:my-14 sm:px-4',
          'md:grid-cols-2 md:px-6',
          'lg:my-20 lg:gap-12',
        )}
      >
        <Hero />
        <ContactForm />
      </main>

      <Separator className='my-12' />

      <Footer />
    </div>
  );
};

export default Contact;
