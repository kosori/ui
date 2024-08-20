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
        <Badge variant='soft' size='small'>
          Small
        </Badge>
        <Badge variant='soft' size='medium'>
          Medium
        </Badge>
        <Badge variant='soft' size='large'>
          Large
        </Badge>
      </div>

      <div className='flex flex-col gap-4'>
        <Badge variant='outline' size='small'>
          Small
        </Badge>
        <Badge variant='outline' size='medium'>
          Medium
        </Badge>
        <Badge variant='outline' size='large'>
          Large
        </Badge>
      </div>
    </div>
  );
};
