import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { defaultConfig } from '~/config/theme';

export type ConfigKey = keyof typeof defaultConfig;
type UpdateColor = { key: ConfigKey; value: string };

const configAtom = atomWithStorage('themeConfig', defaultConfig);

export const useThemeConfig = () => {
  const [config, setConfig] = useAtom(configAtom);

  const updateConfig = ({ key, value }: UpdateColor) =>
    setConfig({ ...config, [key]: value });

  return { config, updateConfig };
};
