'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';

import { useIsMounted } from '~/hooks/use-is-mounted';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Child = () => {
  const [data, setData] = useState('Loading...');
  const { isMounted } = useIsMounted();

  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) setData('OK');
    });
  }, [isMounted]);

  return (
    <p
      className={clsx(
        'text-center',
        data === 'Loading...' ? 'text-grey-text' : 'text-grey-text-contrast',
      )}
    >
      {data}
    </p>
  );
};

export const UseIsMountedDemo = () => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible((state) => !state);
  };

  return (
    <div className='flex flex-col justify-center gap-2'>
      <Button className='w-16' onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </Button>

      {isVisible && <Child />}
    </div>
  );
};
