'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

const chartData = [
  { category: 'Ale', budget: 300, expenses: 300 },
  { category: 'Casa', budget: 350, expenses: 0 },
  { category: 'Spesa', budget: 50, expenses: 20 },
  { category: 'Formazione', budget: 150, expenses: 0 },
  { category: 'Experiences', budget: 150, expenses: 0 },
  { category: 'Benzina', budget: 40, expenses: 20 },
  { category: 'Capelli', budget: 10, expenses: 0 },
  { category: 'Celullare', budget: 10, expenses: 0 },
  { category: 'Gym', budget: 40, expenses: 0 },
  { category: 'ATM', budget: 30, expenses: 30 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const BillsBarChart = () => {
  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='category'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='budget' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='expenses' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
