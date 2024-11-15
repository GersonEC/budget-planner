import { FlowList } from '../components/FlowList';
import { Heading } from '../components/Heading';
import { currencyFormat } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

export const CashFlow = () => {
  const { monthlyBudget } = useMonthlyBudget();

  return (
    <div>
      <Heading variant='title'>Cashflow</Heading>
      <Heading variant='subtitle'>Inflow</Heading>
      <FlowList type='inflow' />
      <Heading variant='subtitle'>Outflow</Heading>
      <FlowList type='outflow' />
      <Heading variant='subtitle'>Net flow</Heading>
      <p>
        <span className=' font-semibold text-green-300'>
          {currencyFormat(monthlyBudget.cashflow.inflow.totalFlow)}
        </span>{' '}
        -{' '}
        <span className=' font-semibold text-red-300'>
          {' '}
          {currencyFormat(monthlyBudget.cashflow.outflow.totalFlow)}
        </span>{' '}
        ={' '}
        <span className=' font-semibold text-blue-400'>
          {currencyFormat(monthlyBudget.cashflow.netflow)}
        </span>
      </p>
    </div>
  );
};
