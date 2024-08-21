'use client';

import type { DateRange } from 'react-day-picker';
import { useState } from 'react';

import { Calendar } from '@kosori/ui/calendar';

export const CalendarDemo = () => {
  const [selected, setSelected] = useState<DateRange | undefined>();

  return (
    <Calendar
      className='rounded-lg border shadow'
      disabled={[new Date('2024-07-01'), new Date('2024-06-10')]}
      mode='range'
      selected={selected}
      onSelect={setSelected}
    />
  );
};
