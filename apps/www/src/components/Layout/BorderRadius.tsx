'use client';

import { CornersIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

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
        <Button icon className='min-w-9' variant='ghost'>
          <CornersIcon />
          <span className='sr-only'>{selectedBorderRadius}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='grid w-80 grid-cols-3 gap-1'
        side='top'
        sideOffset={14}
      >
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
      </PopoverContent>
    </Popover>
  );
};
