import { IconCloudUpload, IconSparkles } from '@tabler/icons-react';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';

const ItemExample = () => (
  <ItemGroup className='w-full max-w-sm'>
    <Item>
      <ItemMedia>
        <IconCloudUpload />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Deploy project</ItemTitle>
        <ItemDescription>Push the latest commit to production.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <span className='text-muted-foreground text-xs'>2m</span>
      </ItemActions>
    </Item>
    <ItemSeparator />
    <Item>
      <ItemMedia>
        <IconSparkles />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Generate preview</ItemTitle>
        <ItemDescription>
          Build a shareable preview of this branch.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <span className='text-muted-foreground text-xs'>5m</span>
      </ItemActions>
    </Item>
  </ItemGroup>
);

export default ItemExample;
