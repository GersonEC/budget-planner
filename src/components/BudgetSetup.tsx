import React, { useState } from 'react';

interface Props {
  setMonthlyBudget: (monthlyBudget: MonthlyBudget) => void;
}

export const BudgetSetup: React.FC<Props> = ({ setMonthlyBudget }) => {
  const [budget, setBudget] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!budget) {
      alert('Please enter a budget');
      return;
    }
    const updatedMonthlyBudget = {
      month: new Date().getMonth(),
      budget,
      bills: [],
    };
    setMonthlyBudget(updatedMonthlyBudget);
    localStorage.setItem('monthlyBudget', JSON.stringify(updatedMonthlyBudget));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='h-100 w-full flex items-center justify-center font-sans'
    >
      <label htmlFor='monthlyBudget'>Set a monthly budget</label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
        name='monthlyBudget'
        type='number'
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
        Add
      </button>
    </form>
  );
};
