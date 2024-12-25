'use client';

import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

import type { ConfigKey } from '~/hooks/use-theme-config';
import { colors } from '~/config/theme';
import { useThemeConfig } from '~/hooks/use-theme-config';

type Props = {
  type: string;
  dataKey: ConfigKey;
  align: 'start' | 'center' | 'end';
};

export const ColorOption = ({
  children,
  align,
  type,
  dataKey,
}: PropsWithChildren<Props>) => {
  const { updateConfig, config } = useThemeConfig();
  const selectedColor = config[dataKey];

  const handleClick = ({ value }: { value: string }) => {
    updateConfig({ key: dataKey, value });
  };

  return (
    <div className='flex w-full flex-col gap-0.5'>
      <h4 className='text-xs uppercase text-grey-text'>{children}</h4>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={clsx(
              'w-full justify-start',
              'border-grey-border bg-grey-base text-grey-text-contrast',
              'hover:border-grey-border-hover hover:bg-grey-bg-subtle',
              'active:bg-grey-bg',
              'focus-visible:ring-grey-focus-ring',
              'disabled:border-grey-line disabled:bg-grey-base disabled:text-grey-line',
            )}
            size='small'
            variant='outline'
          >
            <span className={`size-3.5 rounded-md bg-${selectedColor}-9`} />
            <span className='truncate capitalize'>
              {selectedColor.replaceAll('-', ' ')}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align={align}
          className='grid w-full max-w-[350px] grid-cols-3 gap-1'
          side='top'
        >
          {colors
            .filter((color) => color.type.includes(type))
            .map((color) => (
              <Button
                key={color.name}
                className={clsx(
                  'w-full justify-start',
                  'border-grey-border bg-grey-base text-grey-text-contrast',
                  'hover:border-grey-border-hover hover:bg-grey-bg-subtle',
                  'active:bg-grey-bg',
                  'focus-visible:ring-grey-focus-ring',
                  'disabled:border-grey-line disabled:bg-grey-base disabled:text-grey-line',
                  selectedColor === color.color &&
                    'bg-grey-bg hover:bg-grey-bg',
                )}
                size='small'
                variant='outline'
                onClick={() => handleClick({ value: color.color })}
              >
                <span
                  className={`flex size-3.5 min-w-3.5 items-center justify-center rounded-md bg-${color.color}-9`}
                >
                  {selectedColor === color.color && (
                    <span className='size-2 rounded-full bg-grey-base' />
                  )}
                </span>
                <span className='truncate'>{color.name}</span>
              </Button>
            ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
