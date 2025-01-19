import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx/lite';
import { TerminalIcon } from 'lucide-react';

type Props = HTMLAttributes<HTMLDivElement> & {
  icon?: LucideIcon;
};

export const IconContainer = ({
  icon: Icon,
  ...props
}: Props): React.ReactElement => {
  return (
    <div
      {...props}
      className={clsx(
        'rounded-md border bg-gradient-to-t from-grey-line to-grey-bg-subtle p-0.5 shadow-md',
        props.className,
      )}
    >
      {Icon ? <Icon /> : <TerminalIcon />}
    </div>
  );
};
