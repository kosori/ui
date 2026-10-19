'use client';

import type { DateRange } from '@daypicker/react';
import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';

const CalendarExample = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return <Calendar mode='range' onSelect={setRange} selected={range} />;
};

export default CalendarExample;
