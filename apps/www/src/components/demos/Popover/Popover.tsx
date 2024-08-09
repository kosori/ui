import { Button } from '@kosori/ui/button';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

export const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Dimensions</h4>
            <p className='text-sm text-grey-text'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Width</Label>
              <Input
                className='col-span-2 h-8'
                defaultValue='100%'
                id='width'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Max. width</Label>
              <Input
                className='col-span-2 h-8'
                defaultValue='300px'
                id='maxWidth'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='height'>Height</Label>
              <Input
                className='col-span-2 h-8'
                defaultValue='25px'
                id='height'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxHeight'>Max. height</Label>
              <Input
                className='col-span-2 h-8'
                defaultValue='none'
                id='maxHeight'
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
