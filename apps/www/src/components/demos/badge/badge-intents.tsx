import { Badge } from '@kosori/ui/badge';

export const BadgeIntentsDemo = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <div />
      <p className='text-sm text-grey-text'>Default</p>
      <p className='text-sm text-grey-text'>Soft</p>
      <p className='text-sm text-grey-text'>Outline</p>

      <p className='text-sm text-grey-text'>Default</p>
      <Badge>Badge</Badge>
      <Badge variant='soft'>Badge</Badge>
      <Badge variant='outline'>Badge</Badge>

      <p className='text-sm text-grey-text'>Info</p>
      <Badge intent='info'>Badge</Badge>
      <Badge intent='info' variant='soft'>
        Badge
      </Badge>
      <Badge intent='info' variant='outline'>
        Badge
      </Badge>

      <p className='text-sm text-grey-text'>Success</p>
      <Badge intent='success'>Badge</Badge>
      <Badge intent='success' variant='soft'>
        Badge
      </Badge>
      <Badge intent='success' variant='outline'>
        Badge
      </Badge>

      <p className='text-sm text-grey-text'>Warning</p>
      <Badge intent='warning'>Badge</Badge>
      <Badge intent='warning' variant='soft'>
        Badge
      </Badge>
      <Badge intent='warning' variant='outline'>
        Badge
      </Badge>

      <p className='text-sm text-grey-text'>Error</p>
      <Badge intent='error'>Badge</Badge>
      <Badge intent='error' variant='soft'>
        Badge
      </Badge>
      <Badge intent='error' variant='outline'>
        Badge
      </Badge>
    </div>
  );
};
