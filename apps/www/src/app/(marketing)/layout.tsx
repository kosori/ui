import type { PropsWithChildren } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { ThemeNav } from '~/components/Layout/ThemeNav';
import { baseOptions } from '~/config/layout';

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <HomeLayout
      className='min-h-screen bg-grey-base text-grey-text'
      {...baseOptions}
    >
      {children}
      <ThemeNav />
    </HomeLayout>
  );
};

export default MarketingLayout;
