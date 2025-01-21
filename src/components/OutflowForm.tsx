import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { FlowForm } from './FlowForm';

export const OutflowForm = () => {
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();

  const handleFlowSubmit = (flowList: FlowList) => {
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        outflow: flowList,
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  return (
    <div className='border rounded p-4 shadow-xl'>
      <div className='flex flex-col'>
        <FlowForm type='outflow' handleSubmit={handleFlowSubmit} />
      </div>
    </div>
  );
};
