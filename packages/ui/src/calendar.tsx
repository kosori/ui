'use client';

import type { DayPickerProps } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { DayPicker } from 'react-day-picker';
import { tv } from 'tailwind-variants';

import { buttonStyles } from '@kosori/ui/button';

const calendarStyles = tv({
  slots: {
    months: 'relative flex flex-col gap-4 sm:flex-row',
    month: 'w-full',
    month_caption:
      'relative z-20 mx-10 mb-1 flex h-9 items-center justify-center',
    caption_label: 'text-sm font-medium',
    nav: 'absolute top-0 z-10 flex w-full justify-between',
    button_previous: buttonStyles({
      variant: 'ghost',
      icon: true,
      size: 'small',
      className: clsx(
        'size-9 p-0 text-grey-text',
        'hover:text-grey-text-contrast',
      ),
    }),
    button_next: buttonStyles({
      variant: 'ghost',
      icon: true,
      size: 'small',
      className: clsx(
        'size-9 p-0 text-grey-text',
        'hover:text-grey-text-contrast',
      ),
    }),
    weekday: 'size-9 p-0 text-xs font-normal text-grey-text',
    day_button: clsx(
      'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-grey-text-contrast outline-none',
      'hover:bg-grey-bg hover:text-grey-text-contrast',
      'focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'group-data-[disabled]:pointer-events-none group-data-[disabled]:text-grey-solid group-data-[disabled]:line-through',
      'group-data-[selected]:bg-primary-solid group-data-[selected]:text-primary-base',
      'group-data-[outside]:text-grey-solid',
      'group-data-[selected]:group-data-[outside]:text-primary-base',
      'group-[.range-middle]:group-data-[selected]:bg-grey-bg group-[.range-middle]:group-data-[selected]:text-grey-text-contrast',
      'group-[.range-middle]:rounded-none',
      'group-[.range-end:not(.range-start)]:rounded-s-none',
      'group-[.range-start:not(.range-end)]:rounded-e-none',
      'group-[[data-selected]:not(.range-middle)]:duration-150 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow]',
    ),
    day: 'group size-9 px-0 py-px text-sm',
    range_start: 'range-start',
    range_end: 'range-end',
    range_middle: 'range-middle',
    today:
      '*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary-solid *:after:transition-colors [&[data-disabled]>*]:after:bg-grey-line [&[data-selected]:not(.range-middle)>*]:after:bg-grey-base',
    outside:
      'text-grey-text data-[selected]:bg-grey-bg-active data-[selected]:text-grey-text',
    hidden: 'invisible',
    week_number: 'size-9 select-none p-0 text-xs font-medium text-grey-text',
  },
});

const {
  months,
  month,
  month_caption,
  caption_label,
  nav,
  button_previous,
  button_next,
  weekday,
  day_button,
  day,
  range_start,
  range_end,
  range_middle,
  today,
  outside,
  hidden,
  week_number,
} = calendarStyles();

export type CalendarProps = DayPickerProps;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      className={clsx('w-fit', className)}
      classNames={{
        months: months(),
        month: month(),
        month_caption: month_caption(),
        caption_label: caption_label(),
        nav: nav(),
        button_previous: button_previous(),
        button_next: button_next(),
        weekday: weekday(),
        day_button: day_button(),
        day: day(),
        range_start: range_start(),
        range_end: range_end(),
        range_middle: range_middle(),
        today: today(),
        outside: outside(),
        hidden: hidden(),
        week_number: week_number(),
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === 'left')
            return (
              <ChevronLeftIcon
                className='size-4'
                {...props}
                aria-hidden='true'
              />
            );

          return (
            <ChevronRightIcon
              className='size-4'
              {...props}
              aria-hidden='true'
            />
          );
        },
        ...userComponents,
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';
