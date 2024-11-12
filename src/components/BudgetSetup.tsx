import React from 'react';
import { Input } from './ui/input';

interface Props {
  budget: number | string;
  setBudget: (budget: number) => void;
}

export const BudgetSetup: React.FC<Props> = ({ budget, setBudget }) => {
  return (
    <div className='rounded shadow w-full'>
      <label htmlFor='monthlyBudget'>Set a monthly budget</label>
      <Input
        className=' bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3 mr-4'
        name='monthlyBudget'
        type='number'
        value={budget}
        min={0}
        required
        onChange={(e) => setBudget(Number(e.target.value))}
      />
    </div>
  );
};
