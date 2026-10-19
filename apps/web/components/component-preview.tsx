import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import type { ExampleName } from '@/lib/registry/examples';
import {
  ExamplePreview,
  exampleFileName,
  exampleItemName,
  readExampleSource,
} from '@/lib/registry/examples';
import {
  findStyle,
  radiusTokens,
  type StyleName,
  styleRadius,
} from '@/registry/preset';

/** The Token block a preview needs so the Style's radius reaches its examples. */
const previewRadiusTokens = (style: StyleName) => {
  const definition = findStyle(style);

  if (!definition) {
    return;
  }

  return radiusTokens(styleRadius(definition, 'light'));
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
        style={previewRadiusTokens(style)}
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
