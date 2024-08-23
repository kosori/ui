import { useEffect, useState } from 'react';

export type ConfigKey = keyof typeof defaultConfig;
type UpdateColor = { key: ConfigKey; value: string };

const defaultConfig = {
  'error-color': 'red',
  'grey-color': 'mauve',
  'info-color': 'blue',
  'primary-color': 'dark-mauve',
  'success-color': 'green',
  'warning-color': 'yellow',
  radius: 'medium',
};

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
    const themeWrapper = document.querySelector(`div[data-${key}]`);
    console.log('🚀 ~ theme wrapper:', themeWrapper);

    setConfig(newConfig);
    if (themeWrapper) themeWrapper.setAttribute(`data-${key}`, value);
    localStorage.setItem('themeConfig', JSON.stringify(newConfig));
  };

  return { config, updateConfig };
};
