'use client';

import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverPopup, PopoverTrigger } from '@/components/ui/popover';

/** Show a Calendar anchored to a Button through a Popover. */
export const DatePickerPreview = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className='not-prose flex min-h-40 items-center justify-center rounded-xl border p-6'>
      <Popover>
        <PopoverTrigger
          render={<Button className='w-64 justify-start' variant='outline' />}
        >
          <IconCalendar aria-hidden='true' />
          {date ? date.toLocaleDateString() : 'Pick a date'}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            defaultMonth={date}
            mode='single'
            onSelect={setDate}
            selected={date}
          />
        </PopoverPopup>
      </Popover>
    </div>
  );
};
