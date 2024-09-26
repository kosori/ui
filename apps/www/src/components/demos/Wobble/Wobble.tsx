import { clsx } from 'clsx/lite';

export const WobbleDemo = () => {
  return (
    <div
      className={clsx(
        'relative flex w-14 items-center justify-start',
        'before:animate-wobble before:size-2 before:translate-x-full before:rounded-full before:bg-grey-text-contrast',
      )}
    />
  );
};
