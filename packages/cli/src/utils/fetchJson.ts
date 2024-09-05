type Props = { json: string };

export const fetchJson = async ({ json }: Props) => {
  try {
    const res = await fetch(`https://kosori.codingcodax.dev/${json}`);

    return await res.json();
  } catch {
    throw new Error(`Failed to fetch ${json}`);
  }
};
