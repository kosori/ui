import type { NextPage } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@kosori/ui/tooltip';

import { NextJSIcon } from '~/components/icons/next-js';
import { ReactIcon } from '~/components/icons/react';
import { TailwindCSSIcon } from '~/components/icons/tailwindcss';
import { TypeScriptIcon } from '~/components/icons/typescript';

const Home: NextPage = () => {
  return (
    <div>
      <main
        className={clsx(
          'container flex h-full min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-3 p-8',
        )}
      >
        <h1
          className={clsx(
            'bg-gradient-to-b from-grey-text-contrast to-grey-text bg-clip-text text-center text-4xl font-medium text-transparent',
            'md:text-5xl',
            'lg:text-6xl',
          )}
        >
          Build faster, touch less
        </h1>
        <h2
          className={clsx(
            'text-center text-lg text-grey-text',
            'sm:text-xl',
            'md:text-2xl',
          )}
        >
          Open source react components for modern websites and applications.
        </h2>

        <div className={clsx('mt-6 flex flex-col gap-4', 'sm:flex-row')}>
          <Button asChild className={clsx('w-full', 'sm:w-auto')}>
            <Link href='/docs/ui'>Get Started</Link>
          </Button>

          <Button
            asChild
            className={clsx('w-full', 'sm:w-auto')}
            variant='outline'
          >
            <Link href='/docs/ui/components'>Browse components</Link>
          </Button>
        </div>

        <div className='mt-12 flex justify-center gap-4 text-grey-text-contrast'>
          <Tooltip>
            <TooltipTrigger asChild>
              <NextJSIcon className='size-6' />
            </TooltipTrigger>
            <TooltipContent>Next JS</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ReactIcon className='size-6' />
            </TooltipTrigger>
            <TooltipContent>React</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <TypeScriptIcon className='size-6' />
            </TooltipTrigger>
            <TooltipContent>TypeScript</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <TailwindCSSIcon className='size-6' />
            </TooltipTrigger>
            <TooltipContent>Tailwind CSS</TooltipContent>
          </Tooltip>
        </div>
      </main>
    </div>
  );
};

export default Home;
