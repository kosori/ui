import { IconSearch } from '@tabler/icons-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

const InputGroupExample = () => (
  <InputGroup>
    <InputGroupInput aria-label='Search' placeholder='Search' type='search' />
    <InputGroupAddon>
      <IconSearch aria-hidden='true' />
    </InputGroupAddon>
  </InputGroup>
);

export default InputGroupExample;
