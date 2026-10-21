'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { desktop: 186, mobile: 80, month: 'January' },
  { desktop: 305, mobile: 200, month: 'February' },
  { desktop: 237, mobile: 120, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { desktop: 209, mobile: 130, month: 'May' },
  { desktop: 214, mobile: 140, month: 'June' },
];

const formatMonth = (value: string) => value.slice(0, 3);

const chartConfig = {
  desktop: {
    color: 'var(--chart-1)',
    label: 'Desktop',
  },
  mobile: {
    color: 'var(--chart-2)',
    label: 'Mobile',
  },
} satisfies ChartConfig;

const ChartExample = () => (
  <ChartContainer className='w-full' config={chartConfig}>
    <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <XAxis
        axisLine={false}
        dataKey='month'
        tickFormatter={formatMonth}
        tickLine={false}
        tickMargin={10}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
      <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
    </BarChart>
  </ChartContainer>
);

export default ChartExample;
