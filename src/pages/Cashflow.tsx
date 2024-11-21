import { FlowList } from '../components/FlowList';
import { Heading } from '../components/Heading';
import { currencyFormat } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

export const CashFlow = () => {
  const { monthlyBudget } = useMonthlyBudget();
  const { finances } = usePersonalFinance();
  const installmentList: InstallmentList = finances.installmentList;

  return (
    <div>
      <Heading variant='title'>Cashflow</Heading>
      <Heading variant='subtitle'>Inflow</Heading>
      <FlowList type='inflow' />
      <Heading variant='subtitle'>Outflow</Heading>
      <FlowList type='outflow' />
      <Heading variant='subheading'>Installments</Heading>
      <ul>
        {installmentList.installments.map((installment) => (
          <li key={installment.name}>
            <span className=' text-indigo-300'>
              {installment.name}
              {': '}
            </span>
            {currencyFormat(installment.monthlyCost)}
          </li>
        ))}
      </ul>

      <Heading variant='subtitle'>Net flow</Heading>
      <p>
        <span className=' font-semibold text-green-300'>
          {currencyFormat(monthlyBudget.cashflow.inflow.totalFlow)}
        </span>{' '}
        -{' '}
        <span className=' font-semibold text-red-300'>
          {' '}
          {currencyFormat(
            monthlyBudget.cashflow.outflow.totalFlow +
              installmentList.monthlyTotal
          )}
        </span>{' '}
        ={' '}
        <span className=' font-semibold text-blue-400'>
          {currencyFormat(monthlyBudget.cashflow.netflow)}
        </span>
      </p>
    </div>
  );
};
