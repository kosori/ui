'use client';

import { useEffect } from 'react';

import type { defaultConfig } from '~/config/theme';

export const ThemeLoader = () => {
  useEffect(() => {
    const rawConfig = localStorage.getItem('themeConfig');
    if (!rawConfig) return;

    const config = JSON.parse(rawConfig) as typeof defaultConfig;
    const themeWrapper = document.querySelector('body[kosori-theme-wrapper]');

    if (themeWrapper && config) {
      Object.entries(config).forEach(([key, value]) => {
        themeWrapper.setAttribute(`data-${key}`, value);
      });
    }
  }, []);

  return null;
};
