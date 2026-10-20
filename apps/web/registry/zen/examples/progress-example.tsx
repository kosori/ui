'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

const ProgressExample = () => {
  const [value, setValue] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) =>
        Math.min(100, Math.round(current + Math.random() * 25))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Progress aria-label='Loading progress' value={value} />;
};

export default ProgressExample;
