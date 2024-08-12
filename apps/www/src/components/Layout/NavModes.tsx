import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { modes } from '~/config/modes';

export const NavModes = () => {
  return (
    <div className='rounded-md border p-1 text-sm text-grey-text max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2'>
      {modes.map((m) => (
        <Link
          key={m.param}
          className={clsx(
            'rounded-md px-2 py-1 text-grey-text transition-colors',
            'hover:text-grey-text-contrast',
          )}
          href={`/docs/${m.param}`}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
};
