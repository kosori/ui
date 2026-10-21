import Link from 'next/link';
import { readServedComponentNames } from '@/lib/registry/compatibility';
import { findStyle, type StyleName } from '@/registry/preset';

type Props = {
  style?: StyleName;
};

/**
 * List a Style's implemented components, its Pending names and its Compositions.
 * An Incomplete Style reports only the scope it serves.
 */
const ComponentsStatus = async ({ style }: Props) => {
  if (!style) {
    throw new Error('Components status requires a Style');
  }

  const definition = findStyle(style);
  const implemented = await readServedComponentNames(style);
  const pending = definition?.pending ?? [];
  const compositions = definition?.compositions ?? [];

  return (
    <>
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
        {pending.length > 0 ? (
          <section>
            <h2 className='font-medium text-lg'>Pending</h2>
            <p className='mt-2 text-muted-foreground text-sm'>
              {pending.length} Pending names. sonner is not one of them; the
              Compatibility page explains why.
            </p>
            <ul className='mt-3 space-y-2'>
              {pending.map((name) => (
                <li key={name}>
                  <span className='font-mono text-muted-foreground text-sm'>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {compositions.length > 0 ? (
          <section>
            <h2 className='font-medium text-lg'>Compositions</h2>
            <ul className='mt-3 space-y-2'>
              {compositions.map((name) => (
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
        ) : null}
      </div>
      {definition?.incomplete ? (
        <p className='not-prose text-muted-foreground text-sm'>
          {style} is an Incomplete Style: it serves the components above and
          none of the catalog outside them.
        </p>
      ) : null}
    </>
  );
};

/**
 * Bind the Style a documentation page documents to its components status,
 * because MDX passes no Style of its own.
 */
export const createComponentsStatus = (style?: StyleName) => {
  /** Render the components status for the page's Style. */
  const StyleComponentsStatus = () => <ComponentsStatus style={style} />;

  return StyleComponentsStatus;
};
