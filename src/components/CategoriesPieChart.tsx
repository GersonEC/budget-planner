'use client';

import { PieChart as PieRechart, Pie, Cell } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { chartConfig, createPieChartDataFromCategory } from '../lib/utils';
import { useCategories } from '../context/CategoriesContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export type PieChartData = {
  name: string;
  value: number;
};

export const CategoriesPieChart = () => {
  const { categories } = useCategories();

  const categoryPieChart: PieChartData[] = categories.map((cat) =>
    createPieChartDataFromCategory(cat)
  );

  if (categories.length === 0)
    return (
      <div className=' h-20 w-full'>
        <p className=' text-base'>There are no categories data</p>
      </div>
    );

  return (
    <ChartContainer
      config={chartConfig}
      className=' h-80 min-h-[300px] w-full '
    >
      <PieRechart width={600} height={600}>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={categoryPieChart}
          cx='50%'
          cy='50%'
          outerRadius={100}
          fill='green'
          label
        >
          {categoryPieChart.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
              stroke='gray'
              strokeWidth='1px'
            />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieRechart>
    </ChartContainer>
  );
};
