'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ProgressExample = () => {
  const [value, setValue] = useState(20);
  const advanceProgress = () =>
    setValue((current) => Math.min(100, current + 20));

  return (
    <div className='flex w-full max-w-sm flex-col gap-4'>
      <Progress aria-label='Loading progress' value={value} />
      <Button
        disabled={value >= 100}
        onClick={advanceProgress}
        size='sm'
        variant='outline'
      >
        Advance progress
      </Button>
    </div>
  );
};

export default ProgressExample;
