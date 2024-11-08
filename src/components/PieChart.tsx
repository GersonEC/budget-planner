'use client';

import { PieChart as PieRechart, Pie, Cell } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

const chartConfig = {
  name: {
    label: 'name',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export type PieChartData = {
  name: string;
  value: number;
};

interface Props {
  data: PieChartData[];
}

export const PieChart: React.FC<Props> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[200px] '>
      <PieRechart width={600} height={600}>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={100}
          fill='green'
          label
        >
          {data.map((entry, index) => (
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
