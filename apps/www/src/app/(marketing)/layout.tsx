import { HomeLayout } from 'fumadocs-ui/home-layout';

import { ThemeNav } from '~/components/Layout/ThemeNav';
import { baseOptions } from '~/config/layout';

type Props = { children: React.ReactNode };

const MarketingLayout = ({ children }: Props) => {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <ThemeNav />
    </HomeLayout>
  );
};

export default MarketingLayout;
