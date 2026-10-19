import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import type { ExampleName } from '@/lib/registry/examples';
import {
  ExamplePreview,
  exampleFileName,
  exampleItemName,
  readExampleSource,
} from '@/lib/registry/examples';
import { findStyle, type StyleName } from '@/registry/preset';

const RADIUS_SCALE = [
  ['--radius-sm', 0.6],
  ['--radius-md', 0.8],
  ['--radius-lg', 1],
  ['--radius-xl', 1.4],
  ['--radius-2xl', 1.8],
  ['--radius-3xl', 2.2],
  ['--radius-4xl', 2.6],
] as const;

/** The Token block a preview needs so the Style's radius reaches its examples. */
const radiusTokens = (style: StyleName) => {
  const radius = findStyle(style)?.tokens?.light?.radius;

  if (!radius) {
    return;
  }

  return Object.fromEntries([
    ['--radius', radius],
    ...RADIUS_SCALE.map(([token, factor]) => [
      token,
      `calc(${radius} * ${factor})`,
    ]),
  ]);
};

type Props = {
  name: ExampleName;
  style?: StyleName;
};

/** A Registry Example: the live composition beside the source an install ships. */
const ComponentPreview = async ({ name, style = 'zen' }: Props) => {
  const source = await readExampleSource(style, name);

  return (
    <div className='not-prose my-6 overflow-hidden rounded-xl border'>
      <div className='border-b bg-muted/50 px-4 py-2'>
        <span className='font-mono text-muted-foreground text-xs'>
          {exampleFileName(name)}
        </span>
      </div>
      <div
        className='flex min-h-40 flex-wrap items-center gap-4 p-6'
        style={radiusTokens(style)}
      >
        <ExamplePreview name={name} style={style} />
      </div>
      <ServerCodeBlock
        code={source}
        codeblock={{ title: exampleItemName(name) }}
        lang='tsx'
      />
    </div>
  );
};

export { ComponentPreview };
