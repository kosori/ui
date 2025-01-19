'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx/lite';

import { useTimeout } from '@kosori/hooks/use-timeout';
import { Progress } from '@kosori/ui/progress';

export const UseTimeoutDemo = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Waiting for timeout...');

  const delay = 5000;

  useTimeout(() => {
    // setProgress(0);
    setMessage('Timeout executed');
    console.log('🚀 ~ progress:', progress);
  }, delay);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        console.log('🚀 ~ new progress');
        const newProgress = prev + 2;

        if (newProgress >= 100) {
          clearInterval(interval);
        }

        return newProgress > 100 ? 100 : newProgress;
      });
    }, 96);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex w-52 flex-col items-center justify-center'>
      <Progress className='mb-4' value={progress} />

      <p
        className={clsx(
          'text-center font-mono text-sm',
          progress === 100
            ? 'select-none text-grey-text-contrast'
            : 'cursor-wait text-grey-text',
        )}
      >
        {message}
      </p>
    </div>
  );
};
