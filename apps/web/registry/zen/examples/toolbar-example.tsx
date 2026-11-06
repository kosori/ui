import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/ui/toolbar';

const ToolbarExample = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarButton render={<Toggle />}>Bold</ToolbarButton>
      <ToolbarButton render={<Toggle />}>Underline</ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton render={<Button />}>Save</ToolbarButton>
  </Toolbar>
);

export default ToolbarExample;
