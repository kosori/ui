import { Avatar, AvatarFallback, AvatarImage } from '@kosori/ui/avatar';

export const AvatarSizesDemo = () => (
  <div className='flex gap-x-4'>
    <Avatar>
      <AvatarImage
        alt='@codingcodax'
        src='https://github.com/codingcodax.png'
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>

    <Avatar size='medium'>
      <AvatarImage
        alt='@codingcodax'
        src='https://github.com/codingcodax.png'
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>

    <Avatar size='large'>
      <AvatarImage
        alt='@codingcodax'
        src='https://github.com/codingcodax.png'
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>
  </div>
);
