import { clsx } from 'clsx/lite';

export const FlickDemo = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <a
        className='group relative overflow-hidden text-grey-text-contrast'
        href='#'
      >
        <span className='invisible'>Flick up</span>
        <span
          className={clsx(
            'absolute left-0 top-0 transition-transform duration-500 ease-in-out',
            'group-hover:-translate-y-full',
          )}
        >
          Flick up
        </span>
        <span
          className={clsx(
            'absolute left-0 top-0 translate-y-full transition-transform duration-500 ease-in-out',
            'group-hover:translate-y-0',
          )}
        >
          Flick up
        </span>
      </a>

      <a
        className='group relative overflow-hidden text-grey-text-contrast'
        href='#'
      >
        <span className='invisible'>Flick down</span>
        <span
          className={clsx(
            'absolute left-0 top-0 transition-transform duration-500 ease-in-out',
            'group-hover:translate-y-full',
          )}
        >
          Flick down
        </span>
        <span
          className={clsx(
            'absolute left-0 top-0 -translate-y-full transition-transform duration-500 ease-in-out',
            'group-hover:translate-y-0',
          )}
        >
          Flick down
        </span>
      </a>
    </div>
  );
};
