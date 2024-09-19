import { clsx } from 'clsx/lite';

export const BlendShiftUp = () => {
  return (
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
  );
};
