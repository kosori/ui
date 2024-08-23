'use client';

import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { format } from 'date-fns';

import { Button } from '@kosori/ui/button';
import { Calendar } from '@kosori/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

export const DatePickerDemo = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={clsx(
            'w-[242px] justify-start text-left font-normal',
            !date && 'text-grey-text',
          )}
          variant={'outline'}
        >
          <CalendarIcon />

          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};
