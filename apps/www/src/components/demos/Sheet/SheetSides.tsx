'use client';

import { Button } from '@kosori/ui/button';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@kosori/ui/sheet';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export const SheetSidesDemo = () => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button className='w-full' variant='outline'>
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right' htmlFor='name'>
                  Name
                </Label>
                <Input className='col-span-3' id='name' value='Pedro Duarte' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right' htmlFor='username'>
                  Username
                </Label>
                <Input className='col-span-3' id='username' value='@peduarte' />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};
