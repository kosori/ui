import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { CubeIcon } from '@radix-ui/react-icons';

import ui from '../../../../packages/ui/package.json';

export type Mode = {
  param: string;
  name: string;
  package: string;
  description: string;
  version: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

export const modes: Mode[] = [
  {
    param: 'ui',
    name: 'UI',
    package: '@kosori/ui',
    description: 'The user interface',
    version: ui.version,
    icon: CubeIcon,
  },
];
