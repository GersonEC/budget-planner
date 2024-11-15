import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import {
  buildSubscriptionsCategoryCharData,
  buildSubscriptionsNameCharData,
  chartConfig,
} from '../lib/utils';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SubscriptionsPieChart = () => {
  const { finances } = usePersonalFinance();
  const subscriptions = finances.subscriptionList.subscriptions;
  const subscriptionsCategoryCharData =
    buildSubscriptionsCategoryCharData(subscriptions);
  const subscriptionsNameCharData =
    buildSubscriptionsNameCharData(subscriptions);

  const noSubscriptionDataPresent =
    subscriptionsCategoryCharData.length === 0 &&
    subscriptionsNameCharData.length === 0;

  if (noSubscriptionDataPresent)
    return (
      <div className=' h-20 w-96 '>
        <p className=' text-base'>There are no subscriptions data</p>
      </div>
    );

  return (
    <ChartContainer config={chartConfig} className=' h-80 w-96 min-h-[300px] '>
      <PieChart width={400} height={400}>
        <Pie
          data={subscriptionsCategoryCharData}
          dataKey='value'
          cx='50%'
          cy='50%'
          outerRadius={60}
          fill='#8884d8'
          stroke='darkgrey'
        >
          {subscriptionsCategoryCharData.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
              stroke='gray'
              strokeWidth='1px'
            />
          ))}
        </Pie>
        <Pie
          data={subscriptionsNameCharData}
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
