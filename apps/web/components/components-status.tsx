import Link from 'next/link';
import { readCatalog } from '@/lib/registry/catalog';
import { PENDING_COMPONENTS } from '@/lib/registry/pending';
import type { StyleName } from '@/registry/preset';

type Props = {
  style: StyleName;
};

/** List a Style's implemented components and its Pending names. */
const ComponentsStatus = async ({ style }: Props) => {
  const catalog = await readCatalog(style);
  const implemented = catalog
    .filter((item) => item.type === 'registry:ui')
    .map((item) => item.name)
    .sort();

  return (
    <div className='not-prose my-6 grid gap-8 sm:grid-cols-2'>
      <section>
        <h2 className='font-medium text-lg'>Implemented</h2>
        <ul className='mt-3 space-y-2'>
          {implemented.map((name) => (
            <li key={name}>
              <Link
                className='font-mono text-sm underline underline-offset-4'
                href={`/docs/${style}/${name}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className='font-medium text-lg'>Pending</h2>
        <ul className='mt-3 space-y-2'>
          {PENDING_COMPONENTS.map((name) => (
            <li key={name}>
              <span className='font-mono text-muted-foreground text-sm'>
                {name}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

/**
 * Bind the Style a documentation page documents to its components status,
 * because MDX passes no Style of its own.
 */
export const createComponentsStatus = (style?: StyleName) => {
  /** Render the components status for the page's Style. */
  const StyleComponentsStatus = () => (
    <ComponentsStatus style={style ?? 'zen'} />
  );

  return StyleComponentsStatus;
};
