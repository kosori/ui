'use client';

import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip';

const TooltipExample = () => (
  <Tooltip>
    <TooltipTrigger
      render={
        <button
          className={buttonVariants({ variant: 'outline' })}
          type='button'
        />
      }
    >
      Hover me
    </TooltipTrigger>
    <TooltipPopup>Helpful hint</TooltipPopup>
  </Tooltip>
);

export default TooltipExample;
