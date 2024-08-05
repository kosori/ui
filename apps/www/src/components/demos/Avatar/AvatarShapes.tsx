import { Avatar, AvatarFallback, AvatarImage } from '@kosori/ui/avatar';

export const AvatarShapesDemo = () => (
  <div className='flex gap-x-4'>
    <Avatar className='border'>
      <AvatarImage
        alt='@codingcodax'
        src='https://github.com/codingcodax.png'
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>

    <Avatar className='border' shape='square'>
      <AvatarImage
        alt='@codingcodax'
        src='https://github.com/codingcodax.png'
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>
  </div>
);
