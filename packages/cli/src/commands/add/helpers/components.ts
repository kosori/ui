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

export const getComponents = async ({ names }: { names: string[] }) => {
  const components = await Promise.all(
    names.map(async (component) => {
      return await getComponent({ name: component });
    }),
  );

  return components;
};
