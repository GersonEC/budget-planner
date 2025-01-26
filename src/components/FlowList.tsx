import { useEffect, useState } from 'react';
import { currencyFormat } from '../lib/utils';
import { initialFlowListValue } from '../lib/fakes';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

interface Props {
  type: 'inflow' | 'outflow';
}

export const FlowList: React.FC<Props> = ({ type }) => {
  const [flowList, setFlowList] = useState<FlowList>(initialFlowListValue);
  const { monthlyBudget } = useMonthlyBudget();
  const outflows = monthlyBudget.cashflow.outflow;
  const inflows = monthlyBudget.cashflow.inflow;

  useEffect(() => {
    if (type === 'inflow') {
      setFlowList(inflows);
    } else if (type === 'outflow') {
      setFlowList(outflows);
    }
  }, [type, inflows, outflows]);

  return (
    <ul>
      {flowList.flows.map((flow) => (
        <li key={flow.name}>
          <span className=' text-indigo-300'>{flow.name}</span>:{' '}
          {currencyFormat(flow.quantity)}
        </li>
      ))}
      <p className='mt-2'>
        <span className=' text-indigo-200 font-bold'>Total {type}</span> ={' '}
        {currencyFormat(flowList.totalFlow)}
      </p>
    </ul>
  );
};
