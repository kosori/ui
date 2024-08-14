import { Badge } from '@kosori/ui/badge';

export const BadgeIntentsDemo = () => {
  return (
    <div className='space-x-4'>
      <Badge>Default</Badge>
      <Badge intent='info'>Info</Badge>
      <Badge intent='success'>Success</Badge>
      <Badge intent='warning'>Warning</Badge>
      <Badge intent='error'>Error</Badge>
    </div>
  );
};
