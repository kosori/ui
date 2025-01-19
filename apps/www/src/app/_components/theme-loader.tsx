'use client';

import { useEffect } from 'react';

import { useThemeConfig } from '~/hooks/use-theme-config';

export const ThemeLoader = () => {
  const { config } = useThemeConfig();

  useEffect(() => {
    const themeWrapper = document.querySelector('body[kosori-theme-wrapper]');

    if (themeWrapper) {
      Object.entries(config).forEach(([key, value]) => {
        themeWrapper.setAttribute(`data-${key}`, value);
      });
    }
  }, [config]);

  return null;
};
