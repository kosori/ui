const API_BASE_URL = 'https://kosori.codingcodax.dev';

/**
 * Fetches JSON data from the API
 * @param path - The relative path to the JSON resource
 * @returns Parsed JSON data
 * @throws {Error} When the fetch fails or response is not ok
 */
export const fetchJsonFromApi = async <T = unknown>(
  path: string,
): Promise<T> => {
  const url = new URL(path, API_BASE_URL);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ${path}: ${error.message}`);
    }
    throw new Error(`Failed to fetch ${path}`);
  }
};
