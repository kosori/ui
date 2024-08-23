'use client';

import type { CalendarDay, DayPickerProps, Modifiers } from 'react-day-picker';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { DayPicker } from 'react-day-picker';
import { tv } from 'tailwind-variants';

import { Button, buttonStyles } from '@kosori/ui/button';

const calendarStyles = tv({
  slots: {
    base: 'p-2',
    // classes
    months: 'flex relative',
    month_caption: 'flex justify-center h-7 mx-10 relative items-center',
    weekdays: 'flex flex-row',
    weekday: 'text-grey-text select-none w-8 font-normal text-[0.8rem]',
    month: 'gap-y-4 w-full',
    caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-sm font-medium truncate',
    button_next: buttonStyles({
      variant: 'outline',
      icon: true,
      size: 'small',
      className: clsx(
        'absolute right-0 size-7 bg-transparent p-0 opacity-50',
        'hover:opacity-100',
      ),
    }),
    button_previous: buttonStyles({
      variant: 'outline',
      icon: true,
      size: 'small',
      className: clsx(
        'absolute left-0 size-7 bg-transparent opacity-50',
        'hover:opacity-100',
      ),
    }),
    nav: 'flex items-start',
    month_grid: 'mt-4',
    week: 'flex w-full mt-2',
    day: 'p-0 rounded-lg',
    // day button
    day_button_base: 'bg-transparent font-normal text-grey-text',
    today: clsx(
      'bg-primary-bg text-primary-solid font-medium',
      'hover:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
    ),
    outside: 'pointer-events-none text-grey-text opacity-50',
    disabled: '!bg-transparent !text-grey-line',
    hidden: 'invisible',
    selected: clsx(
      'bg-primary-solid text-primary-base',
      'hover:bg-primary-solid-hover',
      'active:bg-primary-solid-hover',
    ),
    range_start: clsx(
      'rounded-e-none rounded-s-lg bg-primary-solid text-primary-base',
      'hover:bg-primary-solid-hover',
      'active:bg-primary-solid-hover',
    ),
    range_end: clsx(
      'rounded-e-lg rounded-s-none bg-primary-solid text-primary-base',
      'hover:bg-primary-solid-hover',
      'active:bg-primary-solid-hover',
    ),
    range_middle: clsx(
      'rounded-none bg-primary-bg text-primary-text-contrast',
      'hover:bg-primary-bg-hover',
      'active:bg-primary-bg-active',
    ),
    disabled_range_middle: 'bg-primary-solid',
    range_start_end: 'rounded-lg',
  },
});

const {
  base,
  months,
  month_caption,
  weekdays,
  weekday,
  month,
  caption,
  caption_label,
  button_next,
  button_previous,
  nav,
  month_grid,
  week,
  day,
  day_button_base,
  today,
  outside,
  disabled,
  hidden,
  selected,
  range_start,
  range_end,
  range_middle,
  disabled_range_middle,
  range_start_end,
} = calendarStyles();

export type CalendarProps = DayPickerProps;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      className={base({ className })}
      classNames={{
        months: months(),
        month_caption: month_caption(),
        weekdays: weekdays(),
        weekday: weekday(),
        month: month(),
        caption: caption(),
        caption_label: caption_label(),
        button_next: button_next(),
        button_previous: button_previous(),
        nav: nav(),
        month_grid: month_grid(),
        week: week(),
        day: day(),
        ...classNames,
      }}
      components={{
        DayButton,
        Chevron,
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';

type DayButtonProps = {
  day: CalendarDay;
  modifiers: Modifiers;
} & JSX.IntrinsicElements['button'];

const DayButton = ({
  modifiers,
  className,
  ...buttonProps
}: DayButtonProps) => {
  return (
    <Button
      icon
      className={clsx(
        className,
        day_button_base(),
        modifiers.today && today(),
        modifiers.outside && outside(),
        modifiers.disabled && disabled(),
        modifiers.hidden && hidden(),
        modifiers.selected && selected(),
        modifiers.range_start && range_start(),
        modifiers.range_end && range_end(),
        modifiers.range_middle && range_middle(),
        modifiers.disabled && modifiers.range_middle && disabled_range_middle(),
        modifiers.range_start && modifiers.range_end && range_start_end(),
      )}
      size='small'
      variant='ghost'
      {...buttonProps}
      aria-disabled={modifiers.disabled ?? buttonProps['aria-disabled']}
      aria-hidden={modifiers.hidden ?? buttonProps['aria-hidden']}
      aria-selected={modifiers.selected ?? buttonProps['aria-selected']}
    />
  );
};

type ChevronProps = {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: 'up' | 'down' | 'left' | 'right';
};

const Chevron = ({ orientation, disabled, className }: ChevronProps) => {
  const Component =
    orientation === 'left'
      ? ChevronLeftIcon
      : orientation === 'right'
        ? ChevronRightIcon
        : orientation === 'up'
          ? ChevronUpIcon
          : ChevronDownIcon;

  return (
    <Component
      aria-disabled={disabled}
      className={clsx('h-4 w-4', className)}
    />
  );
};
