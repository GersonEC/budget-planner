import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { chartConfig } from '../lib/utils';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

export const LoansBarChart = () => {
  const { finances } = usePersonalFinance();
  const loans = finances.loanList.loans;

  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <BarChart
        width={500}
        height={300}
        data={loans}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='borrower' />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey='quantity'
          fill='#8884d8'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
        />
        <Bar
          dataKey='dividend'
          fill='#82ca9d'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
      </BarChart>
    </ChartContainer>
  );
};
