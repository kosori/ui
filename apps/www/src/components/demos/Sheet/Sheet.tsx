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

export const SheetDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
  );
};
