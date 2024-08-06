'use client';

import { useState } from 'react';

import { Calendar } from '@kosori/ui/calendar';

export const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      className='rounded-2xl border border-grey-line'
      mode='single'
      selected={date}
      onSelect={setDate}
    />
  );
};
