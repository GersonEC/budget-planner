import React, { useState } from 'react';

export const BudgetSetup = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!monthlyBudget) {
      alert('Please enter a monthly budget');
      return;
    }
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
        value={monthlyBudget}
        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
      />
      <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
        Add
      </button>
    </form>
  );
};
