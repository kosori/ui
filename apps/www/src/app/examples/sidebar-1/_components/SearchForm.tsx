import { Search } from 'lucide-react';

import { Label } from '@kosori/ui/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@kosori/ui/sidebar';

type Props = React.ComponentProps<'form'>;

export const SearchForm = ({ ...props }: Props) => {
  return (
    <form {...props}>
      <SidebarGroup className='py-0'>
        <SidebarGroupContent className='relative'>
          <Label className='sr-only' htmlFor='search'>
            Search
          </Label>
          <SidebarInput
            className='pl-8'
            id='search'
            placeholder='Search the docs...'
          />
          <Search className='pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50' />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};
