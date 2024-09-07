import { existsSync, promises as fs } from 'fs';

import { fetchJson } from '~/utils/fetchJson';
import { component, index } from '../schema';

export const getComponentsIndex = async () => {
  const componentsJson = await fetchJson({ json: 'components/index.json' });

  return index.parse(componentsJson);
};

export const getComponent = async ({ name }: { name: string }) => {
  const componentJson = await fetchJson({
    json: `components/${name}.json`,
  });

  return component.parse(componentJson);
};

export const writeComponent = async ({
  component,
  cwd,
  overwrite,
}: {
  component: string;
  cwd: string;
  overwrite: boolean;
}) => {
  const componentPath = `${cwd}/components/${component}.json`;
  const exists = existsSync(componentPath);

  if (exists && !overwrite) {
    throw new Error(`Component ${component} already exists`);
  }

  await fs.writeFile(componentPath, JSON.stringify({}));

  return true;
};
