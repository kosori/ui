import { useEffect, useState } from 'react';

import { defaultConfig } from '~/config/theme';

export type ConfigKey = keyof typeof defaultConfig;
type UpdateColor = { key: ConfigKey; value: string };

export const useThemeConfig = () => {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    const storedColors = localStorage.getItem('themeConfig');

    if (storedColors) {
      setConfig(JSON.parse(storedColors) as typeof defaultConfig);
    }
  }, []);

  const updateConfig = ({ key, value }: UpdateColor) => {
    const newConfig = { ...config, [key]: value };
    const themeWrapper = document.querySelector(`body[data-${key}]`);

    setConfig(newConfig);
    if (themeWrapper) themeWrapper.setAttribute(`data-${key}`, value);
    localStorage.setItem('themeConfig', JSON.stringify(newConfig));
  };

  return { config, updateConfig };
};
