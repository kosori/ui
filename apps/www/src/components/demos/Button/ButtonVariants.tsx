import { Button } from '@kosori/ui/button';

export const ButtonVariantsDemo = () => {
  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button>Solid</Button>
        <Button variant='soft'>Soft</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
      </div>

      <div className='flex gap-2'>
        <Button intent='danger'>Solid</Button>
        <Button intent='danger' variant='soft'>
          Soft
        </Button>
        <Button intent='danger' variant='outline'>
          Outline
        </Button>
        <Button intent='danger' variant='ghost'>
          Ghost
        </Button>
      </div>
    </div>
  );
};
