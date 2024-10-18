import { clsx } from 'clsx/lite';
import { Tabs } from 'fumadocs-ui/components/tabs';

type Props = React.ComponentPropsWithoutRef<typeof Tabs>;

export const InstallTabs = (props: Props) => {
  return (
    <Tabs
      className={clsx(
        'border-none',
        '[&>div:first-child]:rounded-xl [&>div:first-child]:border',
        // '[&>*:not(:first-child):not(:last-child)]',
        '[&>*:not(:first-child):not(:last-child)]:mt-8',
        '[&>*:not(:first-child)]:p-0',
      )}
      {...props}
    />
  );
};

export const KosoriCLITabs = (props: Props) => {
  return (
    <Tabs
      persist
      groupId='kosori-cli'
      items={['npm', 'pnpm', 'yarn', 'bun']}
      {...props}
    />
  );
};
