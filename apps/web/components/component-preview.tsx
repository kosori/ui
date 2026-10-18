import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { ExamplePreview } from '@/lib/registry/examples';
import type { ExampleName } from '@/lib/registry/metadata';
import { examples, readExampleSource } from '@/lib/registry/metadata';

type Props = {
  name: ExampleName;
};

/** A Registry Example: the live composition beside the source an install ships. */
const ComponentPreview = async ({ name }: Props) => {
  const example = examples[name];
  const source = await readExampleSource(example);

  return (
    <div className='not-prose my-6 overflow-hidden rounded-xl border'>
      <div className='border-b bg-muted/50 px-4 py-2'>
        <span className='font-mono text-muted-foreground text-xs'>
          {example.file}
        </span>
      </div>
      <div className='flex min-h-40 flex-wrap items-center gap-4 p-6'>
        <ExamplePreview name={name} />
      </div>
      <ServerCodeBlock
        code={source}
        codeblock={{ title: example.name }}
        lang='tsx'
      />
    </div>
  );
};

export { ComponentPreview };
