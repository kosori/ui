import { Button } from '@kosori/ui/button';

export const ButtonIntentsDemo = () => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      <div />
      <p className='text-sm text-grey-text'>Solid</p>
      <p className='text-sm text-grey-text'>Soft</p>
      <p className='text-sm text-grey-text'>Outline</p>
      <p className='text-sm text-grey-text'>Ghost</p>

      <p className='text-sm text-grey-text'>Default</p>
      <Button variant='solid'>Click me</Button>
      <Button variant='soft'>Click me</Button>
      <Button variant='outline'>Click me</Button>
      <Button variant='ghost'>Click me</Button>

      <p className='text-sm text-grey-text'>Info</p>
      <Button intent='info' variant='solid'>
        Click me
      </Button>
      <Button intent='info' variant='soft'>
        Click me
      </Button>
      <Button intent='info' variant='outline'>
        Click me
      </Button>
      <Button intent='info' variant='ghost'>
        Click me
      </Button>

      <p className='text-sm text-grey-text'>Success</p>
      <Button intent='success' variant='solid'>
        Click me
      </Button>
      <Button intent='success' variant='soft'>
        Click me
      </Button>
      <Button intent='success' variant='outline'>
        Click me
      </Button>
      <Button intent='success' variant='ghost'>
        Click me
      </Button>

      <p className='text-sm text-grey-text'>Warning</p>
      <Button intent='warning' variant='solid'>
        Click me
      </Button>
      <Button intent='warning' variant='soft'>
        Click me
      </Button>
      <Button intent='warning' variant='outline'>
        Click me
      </Button>
      <Button intent='warning' variant='ghost'>
        Click me
      </Button>

      <p className='text-sm text-grey-text'>Error</p>
      <Button intent='error' variant='solid'>
        Click me
      </Button>
      <Button intent='error' variant='soft'>
        Click me
      </Button>
      <Button intent='error' variant='outline'>
        Click me
      </Button>
      <Button intent='error' variant='ghost'>
        Click me
      </Button>
    </div>
  );
};
