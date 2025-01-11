import React, { useState } from 'react';
import { CategoryNavBar } from './CategoryNavBar';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { currencyFormat } from '../lib/utils';
import BillsCardList from './BillsCardList';
import { useCategories } from '../context/CategoriesContext';

interface Props {
  bills: Bill[];
  budget: number;
  categoryNames: string[];
  expenses: number;
  updateBills: (newBills: Bill[]) => void;
}
export const MonthlyBills: React.FC<Props> = ({
  bills,
  budget,
  categoryNames,
  expenses,
  updateBills,
}) => {
  const [activeCategory, setActiveCategory] = useState('');
  const { categories, setCategories } = useCategories();

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

  const updatedExpensesCategory = (categoryName: string, amount: number) => {
    const newCategories = categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          expenses: category.expenses - amount,
        };
      }
      return category;
    });
    setCategories(newCategories);
  };

  const removeBill = (id: string) => {
    const newBills = bills.filter((b) => b.id !== id);
    const bill = bills.find((b) => b.id === id);
    if (bill) {
      updatedExpensesCategory(bill.category, bill.amount);
      updateBills(newBills);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-baseline mb-2'>
        <div>
          <div className='flex gap-2'>
            <p className='text-gray-300 text-sm'>Budget:</p>
            <p className='text-blue-300 font-semibold text-sm'>
              {currencyFormat(budget)}
            </p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-300 text-sm'>Expenses: </p>
            <p className='text-red-300 font-semibold text-sm'>
              {currencyFormat(expenses)}
            </p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-300 text-sm'>Remaining:</p>{' '}
            <p className='text-green-300 font-semibold text-sm'>
              {currencyFormat(budget - expenses)}
            </p>
          </div>
        </div>
        <Button variant='link' className='font-bold text-yellow-200'>
          <Link to='/add-bill'>Add new bill</Link>
        </Button>
      </div>
      <div>
        <CategoryNavBar
          categories={categoryNames}
          activeCategory={activeCategory}
          setNewActiveCategory={setNewActiveCategory}
        />
        <BillsCardList bills={activeBills()} removeBill={removeBill} />
      </div>
    </div>
  );
};
