'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { chartConfig } from '../lib/utils';

const chartData = [
  { name: 'Inflow', value: 2400 },
  { name: 'Outflow', value: -2100 },
  { name: 'Netflow', value: 300 },
];

export function CashflowBarChart() {
  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <ReferenceLine y={0} stroke='#000' />
        <Bar dataKey='value' fill='yellow' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
