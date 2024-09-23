import { clsx } from 'clsx/lite';

export const FillShrinkDemo = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <button
        className={clsx(
          'group relative overflow-x-clip rounded-lg bg-grey-text-contrast px-6 py-3',
          'before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-grey-base before:transition-transform before:duration-500 before:ease-in-out',
          'before:hover:origin-left hover:before:scale-x-100',
        )}
      >
        <span
          className={clsx(
            'relative text-grey-base transition-colors duration-500 ease-in-out',
            'group-hover:text-grey-text-contrast',
          )}
        >
          Left to left
        </span>
      </button>
    </div>
  );
};
