'use client';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

import { borderRadius } from '~/config/theme';
import { useHasMounted } from '~/hooks/use-has-mounted';
import { useThemeConfig } from '~/hooks/use-theme-config';

export const BorderRadiusOption = () => {
  const { updateConfig, config } = useThemeConfig();
  const hasMounted = useHasMounted();
  const selectedBorderRadius = config['radius'];

  if (!hasMounted) {
    return null;
  }

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
            <span className={`size-3.5 rounded-md`} />
            <span className='truncate capitalize'>{selectedBorderRadius}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align='start'
          className='grid w-full max-w-[350px] grid-cols-3 gap-1'
          side='top'
        >
          {borderRadius.map(({ name, value }) => (
            <Button
              key={name}
              className='w-full justify-start'
              size='small'
              variant='outline'
              onClick={() => handleClick({ value })}
            >
              <span className='truncate'>{name}</span>
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
