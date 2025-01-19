import type { PropsWithChildren } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { baseOptions } from '~/config/layout';
import { ThemeNav } from '../_components/theme-nav';

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
