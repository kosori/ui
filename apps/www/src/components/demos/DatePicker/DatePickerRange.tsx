'use client';

import type { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { addDays, format } from 'date-fns';

import { Button } from '@kosori/ui/button';
import { Calendar } from '@kosori/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

export const DatePickerRangeDemo = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={clsx('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={clsx(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-grey-text',
            )}
            id='date'
            variant={'outline'}
          >
            <CalendarIcon />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align='center' className='w-auto p-0'>
          <Calendar
            defaultMonth={date?.from}
            mode='range'
            numberOfMonths={2}
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
