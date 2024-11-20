import React, { useState } from 'react';
import BillsTable from './BillsTable';
import { CategoryNavBar } from './CategoryNavBar';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { currencyFormat } from '../lib/utils';

interface Props {
  bills: Bill[];
  budget: number;
  categories: string[];
  expenses: number;
  updateBills: (newBills: Bill[]) => void;
}
export const MonthlyBills: React.FC<Props> = ({
  bills,
  budget,
  categories,
  expenses,
  updateBills,
}) => {
  const [activeCategory, setActiveCategory] = useState('');

  const activeBills = () => {
    return bills
      ?.filter((bill) =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const setNewActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  const removeBill = (id: string) => {
    const newBills = bills.filter((b) => b.id !== id);
    updateBills(newBills);
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-blue-400'>
            Monthly Budget: {currencyFormat(budget)}
          </p>
          <p className='text-red-400'>Expenses: {currencyFormat(expenses)}</p>
          <p className='text-green-400'>
            Remaining: {currencyFormat(budget - expenses)}
          </p>
        </div>
        <Button variant='secondary'>
          <Link to='/add-bill'>Add new bill</Link>
        </Button>
      </div>
      <div className='flex flex-col border mt-4 p-2'>
        <CategoryNavBar
          categories={categories}
          activeCategory={activeCategory}
          setNewActiveCategory={setNewActiveCategory}
        />
        <BillsTable bills={activeBills()} removeBill={removeBill} />
      </div>
    </div>
  );
};
