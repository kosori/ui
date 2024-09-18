import { Badge } from '@kosori/ui/badge';

export const BadgeSizesDemo = () => {
  return (
    <div className='flex items-end gap-4'>
      <Badge size='small'>Small</Badge>
      <Badge size='medium'>Medium</Badge>
      <Badge size='large'>Large</Badge>
    </div>
  );
};
