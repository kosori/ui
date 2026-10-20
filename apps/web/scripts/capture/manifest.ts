import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

/** The colour schemes every Example is captured in. */
export const CAPTURE_SCHEMES = ['light', 'dark'] as const;

export type CaptureScheme = (typeof CAPTURE_SCHEMES)[number];

/** The directory captures land in, relative to this app. */
export const CAPTURE_DIR = '.visual-proof';

/** The attribute a preview marks its wrapper with, so a capture can find it. */
export const EXAMPLE_ATTRIBUTE = 'data-example';

/** One Example and the documentation route that renders it. */
export type CaptureEntry = {
  example: string;
  route: string;
  schemes: readonly CaptureScheme[];
};

const PREVIEW_PATTERN = /<ComponentPreview\s+name=(?:'([\w-]+)'|"([\w-]+)")/g;

const EXAMPLE_SUFFIX = '-example.tsx';

/** The CSS selector that finds one Example's preview on a documentation page. */
export const captureSelector = (example: string) =>
  `[${EXAMPLE_ATTRIBUTE}="${example}"]`;

/**
 * Pair every zen Example with the documentation page that renders it. A page
 * that renders an Example twice, or an Example no page renders, is a capture
 * the harness cannot make, so it fails here rather than at screenshot time.
 */
export const captureManifest = async (
  webDir = join(import.meta.dirname, '../..')
): Promise<CaptureEntry[]> => {
  const examplesDir = join(webDir, 'registry/zen/examples');
  const docsDir = join(webDir, 'content/docs/zen');

  const exampleFiles = (await readdir(examplesDir)).filter((file) =>
    file.endsWith(EXAMPLE_SUFFIX)
  );
  const examples = new Set(
    exampleFiles.map((file) => basename(file, EXAMPLE_SUFFIX))
  );
  const routes = new Map<string, string>();
  const pages = (await readdir(docsDir)).filter((page) =>
    page.endsWith('.mdx')
  );
  const sources = await Promise.all(
    pages.map(async (file) => ({
      file,
      source: await readFile(join(docsDir, file), 'utf8'),
    }))
  );

  for (const { file, source } of sources) {
    const route = `/docs/zen/${basename(file, '.mdx')}`;

    for (const match of source.matchAll(PREVIEW_PATTERN)) {
      const name = match[1] ?? match[2];

      if (!name) {
        throw new Error(`${route} has a ComponentPreview without a name`);
      }

      if (!examples.has(name)) {
        throw new Error(`${route} renders ${name}, which has no zen Example`);
      }

      const renderedBy = routes.get(name);
      if (renderedBy) {
        throw new Error(`${name} is rendered by ${renderedBy} and ${route}`);
      }

      routes.set(name, route);
    }
  }

  const undocumented = [...examples].filter((name) => !routes.has(name));
  if (undocumented.length > 0) {
    throw new Error(
      `no documentation page renders ${undocumented.sort().join(', ')}`
    );
  }

  return [...routes.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([example, route]) => ({ example, route, schemes: CAPTURE_SCHEMES }));
};
