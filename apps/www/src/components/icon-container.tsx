import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { TerminalIcon } from 'lucide-react';

type Props = HTMLAttributes<HTMLDivElement> & {
  icon?: LucideIcon;
};

export const IconContainer = ({
  icon: Icon,
  ...props
}: Props): React.ReactElement => {
  return <div {...props}>{Icon ? <Icon /> : <TerminalIcon />}</div>;
};
