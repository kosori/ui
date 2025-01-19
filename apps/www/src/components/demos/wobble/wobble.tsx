import { clsx } from 'clsx/lite';

export const WobbleDemo = () => {
  return (
    <div
      className={clsx(
        'relative flex w-14 items-center justify-start',
        'before:size-2 before:translate-x-full before:animate-wobble before:rounded-full before:bg-grey-text-contrast',
      )}
    />
  );
};
