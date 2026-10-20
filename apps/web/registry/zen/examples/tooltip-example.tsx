import { Button } from '@/components/ui/button';
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip';

const TooltipExample = () => (
  <Tooltip>
    <TooltipTrigger render={<Button variant='outline' />}>
      Hover me
    </TooltipTrigger>
    <TooltipPopup>Helpful hint</TooltipPopup>
  </Tooltip>
);

export default TooltipExample;
