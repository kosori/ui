import { clsx } from 'clsx/lite';

export const BlendShiftUp = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 text-center'>
      <a
        className={clsx(
          'relative text-grey-text-contrast',
          'after:absolute after:-bottom-[4px] after:-left-[10%] after:h-0 after:w-[120%] after:bg-grey-base after:mix-blend-exclusion after:transition-all after:duration-300',
          'hover:after:h-[120%]',
        )}
        href='#'
      >
        Blend Shift Up
      </a>

      <a
        className={clsx(
          'relative text-grey-text-contrast',
          'after:absolute after:-left-[10%] after:-top-[4px] after:h-0 after:w-[120%] after:bg-grey-base after:mix-blend-exclusion after:transition-all after:duration-300',
          'hover:after:h-[120%]',
        )}
        href='#'
      >
        Blend Shift Down
      </a>

      <a
        className={clsx(
          'relative text-grey-text-contrast',
          'after:absolute after:-bottom-[10%] after:-left-[10%] after:h-[120%] after:w-0 after:bg-grey-base after:mix-blend-exclusion after:transition-all after:duration-300',
          'hover:after:w-[120%]',
        )}
        href='#'
      >
        Blend Shift Right
      </a>

      <a
        className={clsx(
          'relative text-grey-text-contrast',
          'after:absolute after:-bottom-[10%] after:-right-[10%] after:h-[120%] after:w-0 after:bg-grey-base after:mix-blend-exclusion after:transition-all after:duration-300',
          'hover:after:w-[120%]',
        )}
        href='#'
      >
        Blend Shift Left
      </a>
    </div>
  );
};
