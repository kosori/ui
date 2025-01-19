import { clsx } from 'clsx/lite';

export const WavyDemo = () => {
  return (
    <a
      className={clsx(
        'relative scale-x-100 text-grey-text-contrast transition-colors duration-300',
        "before:absolute before:-bottom-3 before:left-0 before:size-full before:origin-right before:scale-x-0 before:animate-[waving_3s_ease-in-out_infinite] before:bg-[url('/wavy.svg')] before:bg-[length:80px_80px] before:bg-[left_center] before:bg-repeat-x before:transition-transform before:duration-300",
        'hover:text-grey-text hover:before:origin-left hover:before:scale-x-100',
      )}
      href=''
    >
      Wavy
    </a>
  );
};
