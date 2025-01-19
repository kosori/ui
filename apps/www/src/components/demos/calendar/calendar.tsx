'use client';

import { useState } from 'react';

import { Calendar } from '@kosori/ui/calendar';

export const CalendarDemo = () => {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <Calendar
      className='rounded-xl border shadow'
      mode='single'
      selected={selected}
      onSelect={setSelected}
    />
  );
};
