'use client';

import { clsx } from 'clsx/lite';
import { BoxSelectIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { Separator } from '@kosori/ui/separator';

import { borderRadius } from '~/config/theme';
import { useThemeConfig } from '~/hooks/use-theme-config';

export const BorderRadius = () => {
  const { updateConfig, config } = useThemeConfig();
  const selectedBorderRadius = config.radius;

  const handleClick = ({ value }: { value: string }) => {
    updateConfig({ key: 'radius', value });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          icon
          className={clsx('min-w-9', 'data-[state=open]:bg-grey-bg-active')}
          variant='ghost'
        >
          <BoxSelectIcon />
          <span className='sr-only'>{selectedBorderRadius}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={clsx(
          'w-96 translate-x-11',
          'data-[state=closed]:slide-out-to-right-11',
          'data-[state=open]:slide-in-from-right-11',
        )}
        side='top'
        sideOffset={14}
      >
        <h3 className='font-medium'>Border Radius</h3>
        <p className='text-sm text-grey-text'>Playful or professional?</p>

        <Separator className='my-2' />

        <div className='grid grid-cols-3 gap-1'>
          {borderRadius.map(({ name, value, size }) => (
            <Button
              key={name}
              className={clsx(
                'w-full justify-start rounded-none',
                config.radius === value && 'bg-grey-bg hover:bg-grey-bg',
              )}
              size='small'
              style={{ borderRadius: size }}
              variant='outline'
              onClick={() => handleClick({ value })}
            >
              <div className='size-3.5 overflow-hidden'>
                <span
                  className='inline-block size-6 translate-x-[20%] translate-y-[20%] border border-grey-text-contrast'
                  style={{ borderRadius: size }}
                />
              </div>
              <span className='truncate'>{name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
