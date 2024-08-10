import { HomeLayout } from 'fumadocs-ui/home-layout';

import { baseOptions } from '~/config/layout';

type Props = { children: React.ReactNode };

const MarketingLayout = ({ children }: Props) => {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
};

export default MarketingLayout;
