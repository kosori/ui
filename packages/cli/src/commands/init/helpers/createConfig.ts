import { promises as fs } from 'fs';

import type { RawConfig } from '../schema';

type Props = {
  cwd: string;
  config: RawConfig;
};

export const createConfig = async ({ cwd, config }: Props) => {
  await fs.writeFile(
    `${cwd}/kosori.config.json`,
    JSON.stringify(config, null, 2),
    'utf8',
  );
};
