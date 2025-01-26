import React, { useState } from 'react';
import { OutflowNavBar } from './OutflowNavBar';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { currencyFormat, updateOutflows } from '../lib/utils';
import BillsCardList from './BillsCardList';
import { BadgeEuro, Coins, HandCoins } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

interface Props {
  bills: Bill[];
  budget: number;
  outflowNames: string[];
  expenses: number;
  updateBills: (updatedMonthlyBudget: MonthlyBudget, newBills: Bill[]) => void;
}
export const MonthlyBills: React.FC<Props> = ({
  bills,
  budget,
  outflowNames,
  expenses,
  updateBills,
}) => {
  const { toast } = useToast();
  const [activeOutflow, setActiveOutflow] = useState('');
  const { monthlyBudget } = useMonthlyBudget();
  const outflows = monthlyBudget.cashflow.outflow.flows;

  const activeBills = () => {
    return bills
      ?.filter((bill) =>
        activeOutflow ? bill.outflowName === activeOutflow : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const setNewActiveCategory = (category: string) => {
    setActiveOutflow(category);
  };

  const updatedOutflowExpenses = (outflowName: string, amount: number) => {
    const newOutflows = outflows.map((outflow) => {
      if (outflow.name === outflowName) {
        return {
          ...outflow,
          expenses: (outflow.expenses || 0) - amount,
        };
      }
      return outflow;
    });
    const updatedMonthlyBudget = updateOutflows(monthlyBudget, newOutflows);
    return updatedMonthlyBudget;
  };

  const removeBill = (id: string) => {
    const newBills = bills.filter((b) => b.id !== id);
    const bill = bills.find((b) => b.id === id);
    if (bill) {
      const updatedMonthlyBudget = updatedOutflowExpenses(
        bill.outflowName,
        bill.amount
      );
      updateBills(updatedMonthlyBudget, newBills);
      toast({
        variant: 'success',
        title: 'Bill removed correctly',
      });
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <div>
          <div className='flex gap-2 items-center'>
            <BadgeEuro className='w-4 text-blue-300' />
            <p className='text-gray-300 text-sm'>Budget:</p>
            <p className='text-blue-300 font-semibold text-sm'>
              {currencyFormat(budget)}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <Coins className='w-4 text-red-300' />
            <p className='text-gray-300 text-sm'>Expenses: </p>
            <p className='text-red-300 font-semibold text-sm'>
              {currencyFormat(expenses)}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <HandCoins className='w-4 text-green-300' />
            <p className='text-gray-300 text-sm'>Remaining:</p>{' '}
            <p className='text-green-300 font-semibold text-sm'>
              {currencyFormat(budget - expenses)}
            </p>
          </div>
        </div>
        <Button variant='default'>
          <Link to='/add-bill'>Add new bill</Link>
        </Button>
      </div>
      <div className=' flex flex-col gap-4'>
        <OutflowNavBar
          outflows={outflowNames}
          activeCategory={activeOutflow}
          setNewActiveCategory={setNewActiveCategory}
        />
        <BillsCardList bills={activeBills()} removeBill={removeBill} />
      </div>
    </div>
  );
};
