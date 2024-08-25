'use client';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

import type { ConfigKey } from '~/hooks/use-theme-config';
import { colors } from '~/config/theme';
import { useHasMounted } from '~/hooks/use-has-mounted';
import { useThemeConfig } from '~/hooks/use-theme-config';

type Props = {
  type: string;
  dataKey: ConfigKey;
  children: React.ReactNode;
  align: 'start' | 'center' | 'end';
};

export const ColorOption = ({ children, align, type, dataKey }: Props) => {
  const { updateConfig, config } = useThemeConfig();
  const hasMounted = useHasMounted();
  const selectedColor = config[dataKey];

  if (!hasMounted) {
    return null;
  }

  const handleClick = ({ value }: { value: string }) => {
    updateConfig({ key: dataKey, value });
  };

  return (
    <div className='flex w-full flex-col gap-0.5'>
      <h4 className='text-xs uppercase text-grey-text'>{children}</h4>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className='w-full justify-start'
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
                className='w-full justify-start'
                size='small'
                variant='outline'
                onClick={() => handleClick({ value: color.color })}
              >
                <span
                  className={`flex size-3.5 min-w-[0.875rem] items-center justify-center rounded-md bg-${color.color}-9`}
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