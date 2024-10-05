import { clsx } from 'clsx/lite';

export const TextShineDemo = () => {
  return (
    <p
      className={clsx(
        'inline-flex animate-shine bg-[linear-gradient(110deg,#211F26,45%,#FDFCFD,55%,#211F26)] bg-[length:200%_100%] bg-clip-text text-2xl font-medium text-transparent',
        'dark:bg-[linear-gradient(110deg,#FDFCFD,45%,#211F26,55%,#FDFCFD)] dark:bg-[length:200%_100%]',
      )}
    >
      Text Shine
    </p>
  );
};
