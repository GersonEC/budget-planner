import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { chartConfig } from '../lib/utils';

const data = [
  { name: 'Iphone', value: 75 },
  { name: 'Mobili Ricci casa', value: 276 },
  { name: 'Gym', value: 30 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const InstallmentsPieChart = () => {
  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <PieChart width={400} height={400}>
        <Pie
          dataKey='value'
          startAngle={180}
          endAngle={0}
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={80}
          fill='#8884d8'
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
      </PieChart>
    </ChartContainer>
  );
};
