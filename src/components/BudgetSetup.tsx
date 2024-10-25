import React from 'react';

interface Props {
  budget: number;
  setBudget: (budget: number) => void;
}

export const BudgetSetup: React.FC<Props> = ({ budget, setBudget }) => {
  return (
    <div className='rounded shadow w-full lg:w-3/4 lg:max-w-lg'>
      <label htmlFor='monthlyBudget'>Set a monthly budget</label>
      <input
        className='text-black shadow appearance-none border rounded w-full py-2 px-3 mr-4'
        name='monthlyBudget'
        type='number'
        value={budget}
        required
        onChange={(e) => setBudget(Number(e.target.value))}
      />
    </div>
  );
};
