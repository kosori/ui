'use client';

import { DirectionProvider, useDirection } from '@/components/ui/direction';

const ReadDirection = () => {
  const direction = useDirection();

  return (
    <span className='text-muted-foreground text-sm'>
      Reading direction: {direction.toUpperCase()}
    </span>
  );
};

const DirectionExample = () => (
  <DirectionProvider direction='rtl'>
    <div className='flex flex-col gap-2 rounded-lg border p-4' dir='rtl'>
      <p className='font-medium'>مرحبا بالعالم</p>
      <ReadDirection />
    </div>
  </DirectionProvider>
);

export default DirectionExample;
