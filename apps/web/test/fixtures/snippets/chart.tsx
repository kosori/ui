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

const chartConfig = {
  desktop: {
    color: 'var(--chart-1)',
    label: 'Desktop',
  },
} satisfies ChartConfig;

const chartData = [{ desktop: 186, month: 'January' }];

const ChartPage = () => (
  <ChartContainer className='min-h-48 w-full' config={chartConfig}>
    <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <XAxis
        axisLine={false}
        dataKey='month'
        tickLine={false}
        tickMargin={10}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
    </BarChart>
  </ChartContainer>
);

export default ChartPage;
