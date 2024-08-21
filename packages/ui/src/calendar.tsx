'use client';

import type { DayPickerProps } from 'react-day-picker';
import { clsx } from 'clsx/lite';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { Button, buttonStyles } from '@kosori/ui/button';

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={clsx('p-3', className)}
      classNames={{
        months:
          'relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        nav: 'flex items-center justify-between absolute w-full z-10 px-1',
        button_previous: clsx(
          buttonStyles({
            variant: 'outline',
            className:
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          }),
        ),
        button_next: clsx(
          buttonStyles({
            variant: 'outline',
            className:
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          }),
        ),
        month_caption: 'flex justify-center items-center h-7',
        caption_label: 'text-sm font-medium',
        month_grid: 'border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-grey-text w-9 font-normal text-xs',
        weeks: '',
        week: 'flex mt-2',
        day: 'p-0',
        outside: 'bg-primary-base',
        range_middle:
          'bg-primary-bg last:rounded-e-lg first:rounded-s-lg transition-colors',
        range_start:
          'bg-primary-solid text-primary-base rounded-s-lg transition-colors',
        range_end:
          'bg-primary-solid text-primary-base rounded-e-lg transition-colors',
        ...classNames,
      }}
      components={{
        DayButton({ day, modifiers, className, ...buttonProps }) {
          return (
            <Button
              className={clsx(
                className,
                'h-9 w-9 p-0 font-normal',
                modifiers.today && 'bg-primary-bg text-grey-text-contrast',
                modifiers.selected &&
                  'bg-primary hover:bg-primary-hover text-primary-base focus:bg-primary-solid',
                modifiers.outside &&
                  'pointer-events-none text-grey-text opacity-50',
                modifiers.disabled && 'text-grey-text opacity-50',
                modifiers.hidden && 'invisible',
                modifiers.range_start &&
                  'rounded-e-none hover:bg-primary-solid-hover',
                modifiers.range_end &&
                  'rounded-s-none hover:bg-primary-solid-hover',
                modifiers.range_middle &&
                  'rounded-none text-primary-text-contrast first:rounded-s-md last:rounded-e-md hover:rounded-none hover:bg-primary-bg-hover active:bg-primary-bg-active',
                modifiers.outside &&
                  modifiers.selected &&
                  'bg-primary-bg text-primary-text',
                modifiers.outside &&
                  modifiers.range_start &&
                  modifiers.selected &&
                  'bg-primary-solid/40',
                modifiers.disabled &&
                  modifiers.range_middle &&
                  'bg-primary-solid',
              )}
              variant={'ghost'}
              {...buttonProps}
              aria-disabled={modifiers.disabled ?? buttonProps['aria-disabled']}
              aria-hidden={modifiers.hidden ?? buttonProps['aria-hidden']}
              aria-selected={modifiers.selected ?? buttonProps['aria-selected']}
            />
          );
        },
        Chevron({ orientation, disabled, className }) {
          const Component =
            orientation === 'left'
              ? ChevronLeft
              : orientation === 'right'
                ? ChevronRight
                : orientation === 'up'
                  ? ChevronUp
                  : ChevronDown;

          return (
            <Component
              aria-disabled={disabled}
              className={clsx('h-4 w-4', className)}
            />
          );
        },
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
