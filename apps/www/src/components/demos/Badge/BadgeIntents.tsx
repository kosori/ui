import { Badge } from '@kosori/ui/badge';

export const BadgeIntentsDemo = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-4'>
        <Badge>Default</Badge>
        <Badge intent='info'>Info</Badge>
        <Badge intent='success'>Success</Badge>
        <Badge intent='warning'>Warning</Badge>
        <Badge intent='error'>Error</Badge>
      </div>

      <div className='flex flex-col gap-4'>
        <Badge variant='soft'>Default</Badge>
        <Badge intent='info' variant='soft'>
          Info
        </Badge>
        <Badge intent='success' variant='soft'>
          Success
        </Badge>
        <Badge intent='warning' variant='soft'>
          Warning
        </Badge>
        <Badge intent='error' variant='soft'>
          Error
        </Badge>
      </div>

      <div className='flex flex-col gap-4'>
        <Badge variant='outline'>Default</Badge>
        <Badge intent='info' variant='outline'>
          Info
        </Badge>
        <Badge intent='success' variant='outline'>
          Success
        </Badge>
        <Badge intent='warning' variant='outline'>
          Warning
        </Badge>
        <Badge intent='error' variant='outline'>
          Error
        </Badge>
      </div>
    </div>
  );
};
