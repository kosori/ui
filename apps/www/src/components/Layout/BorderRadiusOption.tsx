'use client';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

import { borderRadius } from '~/config/theme';
import { useThemeConfig } from '~/hooks/use-theme-config';

export const BorderRadiusOption = () => {
  const { updateConfig, config } = useThemeConfig();
  const selectedBorderRadius = config.radius;

  const handleClick = ({ value }: { value: string }) => {
    updateConfig({ key: 'radius', value });
  };

  return (
    <div className='flex w-full flex-col gap-0.5'>
      <h4 className='text-xs uppercase text-grey-text'>Border Radius</h4>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className='w-full justify-start'
            size='small'
            variant='outline'
          >
            <div className='size-3.5 overflow-hidden'>
              <span
                className='inline-block size-2 translate-x-[40%] translate-y-[40%] scale-[2] border border-grey-text-contrast'
                style={{
                  borderRadius: borderRadius.find(
                    ({ value }) => value === selectedBorderRadius,
                  )?.size,
                }}
              />
            </div>
            <span className='truncate capitalize'>{selectedBorderRadius}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align='start'
          className='grid w-full max-w-[350px] grid-cols-3 gap-1'
          side='top'
        >
          {borderRadius.map(({ name, value, size }) => (
            <Button
              key={name}
              className='w-full justify-start'
              size='small'
              variant='outline'
              onClick={() => handleClick({ value })}
            >
              <div className='size-3.5 overflow-hidden'>
                <span
                  className='inline-block size-2 translate-x-[40%] translate-y-[40%] scale-[2] border border-grey-text-contrast'
                  style={{ borderRadius: size }}
                />
              </div>
              <span className='truncate'>{name}</span>
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
