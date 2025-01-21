import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { FlowForm } from './FlowForm';

export const InflowForm = () => {
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();

  const handleFlowSubmit = (flowList: FlowList) => {
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        inflow: flowList,
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  return (
    <div className='border rounded p-4 shadow-xl'>
      <div className='flex flex-col'>
        <FlowForm type='inflow' handleSubmit={handleFlowSubmit} />
      </div>
    </div>
  );
};
