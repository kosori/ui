import { clsx } from 'clsx/lite';

export const ShineDemo = () => {
  return (
    <div className='flex gap-2'>
      <button
        className={clsx(
          'relative flex h-9 items-center justify-center overflow-clip rounded-lg bg-grey-text-contrast px-3 text-sm font-semibold text-grey-base',
          'after:absolute after:-bottom-1/2 after:-top-1/2 after:w-3 after:bg-grey-base/20 after:transition-transform after:duration-700 after:ease-in-out after:[transform:translate3d(-600%,0,0)_rotate(35deg)]',
          'hover:after:[transform:translate3d(600%,0,0)_rotate(35deg)]',
        )}
      >
        Shine
      </button>
    </div>
  );
};
