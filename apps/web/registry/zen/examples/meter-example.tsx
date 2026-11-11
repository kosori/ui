'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from '@/components/ui/meter';

const MeterExample = () => {
  const [value, setValue] = useState(75);
  const increaseUsage = () =>
    setValue((current) => Math.min(100, current + 10));

  return (
    <div className='flex w-full max-w-sm flex-col gap-4'>
      <Meter value={value}>
        <div className='flex items-center justify-between gap-2'>
          <MeterLabel>Storage usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Button
        disabled={value >= 100}
        onClick={increaseUsage}
        size='sm'
        variant='outline'
      >
        Increase usage
      </Button>
    </div>
  );
};

export default MeterExample;
