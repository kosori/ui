import { clsx } from 'clsx/lite';

export const FillShiftDemo = () => {
  return (
    <div className='flex gap-4'>
      <button
        className={clsx(
          'group relative flex h-9 items-center justify-center overflow-x-clip rounded-lg bg-grey-text-contrast px-3 text-sm font-semibold',
          'before:absolute before:-left-px before:bottom-0 before:h-[calc(100%+4px)] before:w-[calc(100%+2px)] before:origin-right before:translate-y-0.5 before:scale-x-0 before:bg-grey-base before:transition-transform before:duration-500 before:ease-in-out',
          'before:hover:origin-left hover:before:scale-x-100',
        )}
      >
        <span
          className={clsx(
            'relative text-grey-base transition-colors duration-500 ease-in-out',
            'group-hover:text-grey-text-contrast',
          )}
        >
          Left to right
        </span>
      </button>

      <button
        className={clsx(
          'group relative flex h-9 items-center justify-center overflow-x-clip rounded-lg bg-grey-text-contrast px-3 text-sm font-semibold',
          'before:absolute before:-left-px before:bottom-0 before:h-[calc(100%+4px)] before:w-[calc(100%+2px)] before:origin-left before:translate-y-0.5 before:scale-x-0 before:bg-grey-base before:transition-transform before:duration-500 before:ease-in-out',
          'before:hover:origin-right hover:before:scale-x-100',
        )}
      >
        <span
          className={clsx(
            'relative text-grey-base transition-colors duration-500 ease-in-out',
            'group-hover:text-grey-text-contrast',
          )}
        >
          Right to left
        </span>
      </button>
    </div>
  );
};
