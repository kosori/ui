import { clsx } from 'clsx/lite';

export const SquiggleDemo = () => {
  return (
    <a
      className={clsx(
        'text-grey-text-contrast underline decoration-2 underline-offset-4',
        "hover:bg-[url('/squiggle.svg')] hover:no-underline",
      )}
      href='#'
    >
      squiggle
    </a>
  );
};
