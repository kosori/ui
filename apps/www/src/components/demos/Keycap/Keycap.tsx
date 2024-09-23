import { clsx } from 'clsx/lite';

export const KeycapDemo = () => {
  return (
    <div className='flex gap-2'>
      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      >
        ⌃
      </button>

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      >
        ⌥
      </button>

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      >
        ⌘
      </button>

      <button
        className={clsx(
          'flex h-9 w-24 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      />

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      >
        ⌘
      </button>

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-b-4 border-grey-line border-b-grey-text-contrast bg-grey-bg text-sm font-semibold text-grey-text-contrast transition-[border] duration-100 ease-in-out',
          'hover:border-b-[1px] hover:border-grey-line',
        )}
      >
        ⌥
      </button>
    </div>
  );
};
