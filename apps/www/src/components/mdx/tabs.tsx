import { clsx } from 'clsx/lite';
import { Tabs } from 'fumadocs-ui/components/tabs';

type Props = React.ComponentPropsWithoutRef<typeof Tabs>;

export const InstallTabs = (props: Props) => {
  return (
    <Tabs
      persist
      className={clsx(
        'border-none bg-grey-base',
        '[&>div:first-child]:rounded-xl [&>div:first-child]:border',
        // '[&>*:not(:first-child):not(:last-child)]',
        '[&>*:not(:first-child):not(:last-child)]:mt-8',
        '[&>*:not(:first-child)]:p-0',
      )}
      groupId='kosori-install'
      {...props}
    />
  );
};
