'use client';

import { useThemeConfig } from '~/hooks/use-theme-config';

type Props = { children: React.ReactNode };

export const ThemeWrapper = ({ children }: Props) => {
  const { config } = useThemeConfig();

  return (
    <div
      data-error-color={config['error-color']}
      data-grey-color={config['grey-color']}
      data-info-color={config['info-color']}
      data-primary-color={config['primary-color']}
      data-radius={config.radius}
      data-success-color={config['success-color']}
      data-warning-color={config['warning-color']}
    >
      {children}
    </div>
  );
};
