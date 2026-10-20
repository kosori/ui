import { Badge } from '@/components/ui/badge';

const BadgeExample = () => (
  <div className='flex flex-wrap gap-2'>
    <Badge>Default</Badge>
    <Badge variant='secondary'>Secondary</Badge>
    <Badge variant='outline'>Outline</Badge>
    <Badge variant='destructive'>Destructive</Badge>
    <Badge variant='success'>Success</Badge>
    <Badge variant='warning'>Warning</Badge>
    <Badge variant='info'>Info</Badge>
  </div>
);

export default BadgeExample;
