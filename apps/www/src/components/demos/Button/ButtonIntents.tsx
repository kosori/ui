import { Button } from '@kosori/ui/button';

export const ButtonIntentsDemo = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-4'>
        <Button>Default</Button>
        <Button intent='info'>Info</Button>
        <Button intent='success'>Success</Button>
        <Button intent='warning'>Warning</Button>
        <Button intent='error'>Error</Button>
      </div>

      <div className='flex flex-col gap-4'>
        <Button variant='soft'>Default</Button>
        <Button intent='info' variant='soft'>
          Info
        </Button>
        <Button intent='success' variant='soft'>
          Success
        </Button>
        <Button intent='warning' variant='soft'>
          Warning
        </Button>
        <Button intent='error' variant='soft'>
          Error
        </Button>
      </div>

      <div className='flex flex-col gap-4'>
        <Button variant='outline'>Default</Button>
        <Button intent='info' variant='outline'>
          Info
        </Button>
        <Button intent='success' variant='outline'>
          Success
        </Button>
        <Button intent='warning' variant='outline'>
          Warning
        </Button>
        <Button intent='error' variant='outline'>
          Error
        </Button>
      </div>

      <div className='flex flex-col gap-4'>
        <Button variant='ghost'>Default</Button>
        <Button intent='info' variant='ghost'>
          Info
        </Button>
        <Button intent='success' variant='ghost'>
          Success
        </Button>
        <Button intent='warning' variant='ghost'>
          Warning
        </Button>
        <Button intent='error' variant='ghost'>
          Error
        </Button>
      </div>
    </div>
  );
};
