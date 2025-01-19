import { clsx } from 'clsx/lite';
import { PaletteIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { Separator } from '@kosori/ui/separator';

import { ColorOption } from './color-option';

export const Palette = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          icon
          className={clsx('min-w-9', 'data-[state=open]:bg-grey-bg-active')}
          variant='ghost'
        >
          <PaletteIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={clsx(
          'w-[calc(var(--radix-popover-content-available-width)-2rem)]',
          'min-[440px]:w-96',
        )}
        sideOffset={14}
      >
        <h3 className='font-medium'>Colors</h3>
        <p className='text-sm text-grey-text'>
          Create the perfect color palette.
        </p>

        <Separator className='my-2' />

        <div className='grid grid-cols-3 gap-2'>
          <ColorOption align='start' dataKey='primary-color' type='primary'>
            Primary
          </ColorOption>

          <ColorOption align='center' dataKey='grey-color' type='grey'>
            Grey
          </ColorOption>

          <ColorOption align='end' dataKey='info-color' type='info'>
            Info
          </ColorOption>

          <ColorOption align='start' dataKey='success-color' type='success'>
            Success
          </ColorOption>

          <ColorOption align='center' dataKey='warning-color' type='warning'>
            Warning
          </ColorOption>

          <ColorOption align='end' dataKey='error-color' type='error'>
            Error
          </ColorOption>
        </div>
      </PopoverContent>
    </Popover>
  );
};
