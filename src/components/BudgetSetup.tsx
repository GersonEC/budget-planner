import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  budget: number | string;
  setBudget: (budget: number) => void;
}

export const BudgetSetup: React.FC<Props> = ({ budget, setBudget }) => {
  return (
    <div className='rounded shadow w-full pb-4 border-b-2'>
      <Label htmlFor='monthlyBudget'>Budget quantity</Label>
      <Input
        className=' bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3 mr-4'
        name='monthlyBudget'
        type='number'
        value={budget}
        placeholder='1500'
        onChange={(e) => setBudget(Number(e.target.value))}
      />
    </div>
  );
};
