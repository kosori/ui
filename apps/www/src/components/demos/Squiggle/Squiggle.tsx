import { clsx } from 'clsx/lite';

export const SquiggleDemo = () => {
  return (
    <a
      className={clsx(
        'text-grey-text-contrast underline underline-offset-[3px]',
        "hover:bg-[url('/squiggle.svg')] hover:no-underline",
      )}
      href='#'
    >
      squiggle
    </a>
  );
};
