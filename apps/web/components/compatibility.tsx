import Link from 'next/link';
import { getCompatibilityFacts } from '@/lib/registry/compatibility';
import type { StyleName } from '@/registry/preset';

type Props = {
  style?: StyleName;
};

/**
 * Render a Style's deliberate shadcn/ui divergences, aliases, Pending names and
 * Compositions from the Registry sources and the Style's own catalog.
 */
const Compatibility = async ({ style }: Props) => {
  if (!style) {
    throw new Error('Compatibility requires a Style');
  }

  const facts = await getCompatibilityFacts(style);

  return (
    <div className='not-prose my-8 space-y-10'>
      <section className='space-y-4'>
        <h2 className='font-medium text-lg'>Deliberate divergences</h2>
        {facts.divergences.map(({ body, code, id, title }) => (
          <div key={id}>
            <h3 className='font-medium'>{title}</h3>
            <p className='text-muted-foreground text-sm'>{body}</p>
            <ul className='mt-2 flex flex-wrap gap-2'>
              {code.map((name) => (
                <li key={name}>
                  <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
                    {name}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className='font-medium text-lg'>Export aliases</h2>
        <p className='mt-2 text-muted-foreground text-sm'>
          shadcn/ui names that resolve to another exported name in the same
          item. These are aliases, not second implementations.
        </p>
        {facts.aliases.length > 0 ? (
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {facts.aliases.map(({ item, local, name }) => (
              <li className='font-mono text-sm' key={`${item}-${name}`}>
                {name}
                <span className='text-muted-foreground'>
                  {' '}
                  ← {item}/{local}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-3 text-muted-foreground text-sm'>
            {style} serves no aliased exports.
          </p>
        )}
      </section>

      <section>
        <h2 className='font-medium text-lg'>Synthesized shadcn/ui exports</h2>
        <p className='mt-2 text-muted-foreground text-sm'>
          Exports kosori builds because coss/ui has no name to rename.
        </p>
        {facts.synthesized.length > 0 ? (
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {facts.synthesized.map(({ item, names }) => (
              <li className='text-sm' key={item}>
                <span className='text-muted-foreground'>{item}: </span>
                <span className='font-mono'>{names.join(', ')}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-3 text-muted-foreground text-sm'>
            {style} adds no synthesized exports.
          </p>
        )}
      </section>

      <section>
        <h2 className='font-medium text-lg'>Pending</h2>
        <p className='mt-2 text-muted-foreground text-sm'>
          Names this Style publishes as part of its scope but does not serve.
          They have no page and never appear in the Registry catalog. sonner is
          not Pending; the divergence above explains why it is absent.
        </p>
        {facts.pending.length > 0 ? (
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {facts.pending.map((name) => (
              <li className='font-mono text-sm' key={name}>
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-3 text-muted-foreground text-sm'>
            {style} declares no Pending names.
          </p>
        )}
      </section>

      <section>
        <h2 className='font-medium text-lg'>Compositions</h2>
        <p className='mt-2 text-muted-foreground text-sm'>
          Documented patterns that are not Registry items and never will be.
        </p>
        {facts.compositions.length > 0 ? (
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {facts.compositions.map((name) => (
              <li className='font-mono text-sm' key={name}>
                <Link
                  className='underline underline-offset-4'
                  href={`/docs/${style}/${name}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-3 text-muted-foreground text-sm'>
            {style} declares no Compositions.
          </p>
        )}
      </section>

      {facts.incomplete && facts.notServed.length > 0 ? (
        <section>
          <h2 className='font-medium text-lg'>Not served by {style}</h2>
          <p className='mt-2 text-muted-foreground text-sm'>
            {style} is an Incomplete Style. It does not serve these names at
            all, so the compatibility notes above cover only what {style}
            actually serves.
          </p>
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {facts.notServed.map((name) => (
              <li className='font-mono text-sm' key={name}>
                {name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

/**
 * Bind the Style a documentation page documents to its compatibility facts,
 * because MDX passes no Style of its own.
 */
export const createCompatibility = (style?: StyleName) => {
  /** Render the compatibility page for the page's Style. */
  const StyleCompatibility = () => <Compatibility style={style} />;

  return StyleCompatibility;
};
