import { clsx } from 'clsx/lite';

export const SwingDemo = () => {
  return (
    <a
      className={clsx('text-grey-text-contrast', 'hover:animate-swing')}
      href='#'
    >
      Swing
    </a>
  );
};
