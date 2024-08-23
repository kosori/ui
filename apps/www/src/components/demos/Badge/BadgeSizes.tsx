import { Badge } from '@kosori/ui/badge';

export const BadgeSizesDemo = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-4'>
        <Badge size='small'>Small</Badge>
        <Badge size='medium'>Medium</Badge>
        <Badge size='large'>Large</Badge>
      </div>

      <div className='flex flex-col gap-4'>
        <Badge size='small' variant='soft'>
          Small
        </Badge>
        <Badge size='medium' variant='soft'>
          Medium
        </Badge>
        <Badge size='large' variant='soft'>
          Large
        </Badge>
      </div>

      <div className='flex flex-col gap-4'>
        <Badge size='small' variant='outline'>
          Small
        </Badge>
        <Badge size='medium' variant='outline'>
          Medium
        </Badge>
        <Badge size='large' variant='outline'>
          Large
        </Badge>
      </div>
    </div>
  );
};
