import { fetchJsonFromApi } from '~/utils/fetch';
import { ComponentJson, ComponentsIndices } from '../schema';

/**
 * Fetches and parses the component index JSON file
 * @returns Parsed component index data
 */
export const fetchComponentsIndices = async () => {
  const indexData = await fetchJsonFromApi('components/index.json');
  return ComponentsIndices.parse(indexData);
};

/**
 * Fetches and parses a single component by name
 */
export const fetchComponentJson = async (name: string) => {
  const componentData = await fetchJsonFromApi(`components/${name}.json`);
  return ComponentJson.parse(componentData);
};

/**
 * Fetches and parses multiple components by their names
 */
export const fetchComponentsJson = async (names: string[]) => {
  return await Promise.all(names.map((name) => fetchComponentJson(name)));
};
