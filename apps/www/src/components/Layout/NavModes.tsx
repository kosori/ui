import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { modes } from '~/config/modes';

export const NavModes = () => {
  return (
    <div
      className={clsx(
        'hidden rounded-lg border p-1 text-sm',
        'sm:inline-block',
        'max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2',
      )}
    >
      {modes.map((m) => (
        <Link
          key={m.param}
          className={clsx(
            'text-fd-muted-foreground px-2 py-1 font-medium transition-colors',
            'hover:text-fd-accent-foreground',
          )}
          href={`/docs/${m.param}`}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
};
