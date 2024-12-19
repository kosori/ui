'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@kosori/ui/progress';

export const ProgressDemo = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress className='w-3/5' value={progress} />;
};
