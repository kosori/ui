'use client';

import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { addDays, format } from 'date-fns';

import { Button } from '@kosori/ui/button';
import { Calendar } from '@kosori/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

const dates = [
  {
    label: 'Today',
    days: 0,
  },
  {
    label: 'Yesterday',
    days: -1,
  },
  {
    label: 'Tomorrow',
    days: 1,
  },
  {
    label: 'In 3 days',
    days: 3,
  },
  {
    label: 'Past week',
    days: -7,
  },
  {
    label: 'In a week',
    days: 7,
  },
  {
    label: 'In two weeks',
    days: 14,
  },
  {
    label: 'In a month',
    days: 30,
  },
];

export const DatePickerPresetsDemo = () => {
  const [date, setDate] = useState<Date>();

  const handleChnageDate = (days: number) => {
    setDate(addDays(new Date(), days));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={clsx(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-grey-text',
          )}
          variant={'outline'}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='center'
        className='flex w-auto divide-x divide-grey-line rounded-xl p-0'
      >
        <div className='flex w-40 flex-col gap-0.5 p-2'>
          {dates.map(({ label, days }) => {
            const isSelected =
              format(date ?? new Date(), 'PPP') ===
              format(addDays(new Date(), days), 'PPP');

            return (
              <Button
                key={label}
                className='w-full justify-start'
                size='small'
                variant={isSelected && date ? 'soft' : 'ghost'}
                onClick={() => handleChnageDate(days)}
              >
                {label}
              </Button>
            );
          })}
        </div>

        <div className=''>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
