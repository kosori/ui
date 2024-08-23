'use client';

import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { addDays, format } from 'date-fns';

import { Button } from '@kosori/ui/button';
import { Calendar } from '@kosori/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kosori/ui/select';

export const DatePickerPresetsDemo = () => {
  const [date, setDate] = useState<Date>();

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
        align='start'
        className='flex w-auto flex-col space-y-2 rounded-xl p-2'
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-xl border shadow-sm'>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
