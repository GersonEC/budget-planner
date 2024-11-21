'use client';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { useCategories } from '../context/CategoriesContext';

type BillsBarChartData = {
  category: string;
  budget: number;
  expenses: number;
};

export const BillsBarChart = () => {
  const { categories } = useCategories();
  const [chartData, setChartData] = useState<BillsBarChartData[]>([]);

  useEffect(() => {
    const buildChartData = () => {
      const data: BillsBarChartData[] = [];
      categories.map((category) => {
        const item: BillsBarChartData = {
          category: category.name,
          budget: Number(category.budget),
          expenses: category.expenses,
        };
        data.push(item);
      });
      setChartData(data);
    };
    buildChartData();
  }, [categories]);

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

  if (chartData.length === 0)
    return (
      <div className=' h-20 w-96 sm:w-full'>
        <p className=' text-base'>There are no bills data</p>
      </div>
    );

  return (
    <ChartContainer config={chartConfig} className='h-80 min-h-[300px] w-full'>
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
