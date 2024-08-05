import { Avatar, AvatarFallback, AvatarImage } from '@kosori/ui/avatar';

export const AvatarDemo = () => (
  <Avatar>
    <AvatarImage
      alt='@codingcodax avatar'
      src='https://github.com/codingcodax.png'
    />
    <AvatarFallback>CC</AvatarFallback>
  </Avatar>
);
