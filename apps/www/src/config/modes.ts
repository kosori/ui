import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { ContainerIcon, CubeIcon, MixIcon } from '@radix-ui/react-icons';

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
    description: 'Core components',
    version: ui.version,
    icon: CubeIcon,
  },
  {
    param: 'hooks',
    name: 'Hooks',
    package: '@kosori/hooks',
    description: 'React custom hooks',
    version: '0.1.0',
    icon: ContainerIcon,
  },
  {
    param: 'mini',
    name: 'Mini',
    package: '@kosori/mini',
    description: 'Micro components',
    version: '0.1.0',
    icon: MixIcon,
  },
];
