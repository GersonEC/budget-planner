import React, { useState } from 'react';
import { Button } from './ui/button';

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
      expenses: 0,
      bills: [],
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='h-100 w-full flex items-center justify-center font-sans'
    >
      <label htmlFor='monthlyBudget'>Set a monthly budget</label>
      <input
        className='text-black shadow appearance-none border rounded w-full py-2 px-3 mr-4'
        name='monthlyBudget'
        type='number'
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <Button>Add</Button>
    </form>
  );
};
