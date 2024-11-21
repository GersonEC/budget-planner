import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { chartConfig } from '../lib/utils';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const InstallmentsPieChart = () => {
  const { finances } = usePersonalFinance();
  const installments = finances.installmentList.installments;

  if (installments.length === 0)
    return (
      <div className=' h-20 w-full'>
        <p className=' text-base'>There are no installments data</p>
      </div>
    );

  return (
    <ChartContainer config={chartConfig} className=' h-80 min-h-[300px] w-full'>
      <PieChart width={400} height={400}>
        <Pie
          dataKey='monthlyCost'
          startAngle={180}
          endAngle={0}
          data={installments}
          cx='50%'
          cy='50%'
          outerRadius={80}
          fill='#8884d8'
          label
        >
          {installments.map((entry, index) => (
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
