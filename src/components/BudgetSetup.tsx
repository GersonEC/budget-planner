import React, { useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';

export const BudgetSetup = () => {
  const { setMonthlyBudget } = useMonthlyBudget();
  const [budget, setBudget] = useState<number>(0);
  const navigate = useNavigate();

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
    navigate({
      to: '/bills',
    });
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
