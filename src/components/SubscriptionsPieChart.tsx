import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { chartConfig } from '../lib/utils';

const data01 = [
  { name: 'Entertainment', value: 20 },
  { name: 'Learning', value: 30 },
  { name: 'Productivity', value: 50 },
];
const data02 = [
  { name: 'Netflix', value: 8 },
  { name: 'Amazon Prime', value: 10 },
  { name: 'Spotify', value: 2 },
  { name: 'Headspace', value: 20 },
  { name: 'Notion', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SubscriptionsPieChart = () => {
  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey='value'
          cx='50%'
          cy='50%'
          outerRadius={60}
          fill='#8884d8'
          stroke='darkgrey'
        >
          {data01.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
              stroke='gray'
              strokeWidth='1px'
            />
          ))}
        </Pie>
        <Pie
          data={data02}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={70}
          outerRadius={90}
          fill='#82ca9d'
          label
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  );
};
