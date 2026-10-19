import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group';

const ButtonGroupExample = () => (
  <ButtonGroup aria-label='Pagination'>
    <ButtonGroup aria-label='Page numbers'>
      <Button className='min-w-8' variant='outline'>
        1
      </Button>
      <ButtonGroupSeparator />
      <Button className='min-w-8' variant='outline'>
        2
      </Button>
      <ButtonGroupSeparator />
      <Button className='min-w-8' variant='outline'>
        3
      </Button>
      <ButtonGroupSeparator />
      <Button className='min-w-8' variant='outline'>
        4
      </Button>
      <ButtonGroupSeparator />
      <Button className='min-w-8' variant='outline'>
        5
      </Button>
    </ButtonGroup>
    <ButtonGroup aria-label='Navigation'>
      <Button aria-label='Previous' size='icon' variant='outline'>
        <IconArrowLeft aria-hidden='true' />
      </Button>
      <ButtonGroupSeparator />
      <Button aria-label='Next' size='icon' variant='outline'>
        <IconArrowRight aria-hidden='true' />
      </Button>
    </ButtonGroup>
  </ButtonGroup>
);

export default ButtonGroupExample;
