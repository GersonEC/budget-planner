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
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

export function CashflowBarChart() {
  const { monthlyBudget } = useMonthlyBudget();

  const chartData = [
    { name: 'Inflow', value: monthlyBudget.cashflow.inflow },
    { name: 'Outflow', value: -monthlyBudget.cashflow.outflow },
    { name: 'Netflow', value: monthlyBudget.cashflow.netflow },
  ];

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
