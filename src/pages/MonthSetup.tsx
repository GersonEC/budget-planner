import React, { useEffect } from 'react';
import { useCategories } from '../context/CategoriesContext copy';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Link } from '@tanstack/react-router';

export const MonthSetup = () => {
  const { categories, setCategories } = useCategories();
  const { setMonthlyBudget } = useMonthlyBudget();

  useEffect(() => {
    const categoriesInLocalStorage = localStorage.getItem('categories');
    const monthlyBudgetInLocalStorage = localStorage.getItem('monthlyBudget');

    if (categoriesInLocalStorage) {
      setCategories(JSON.parse(categoriesInLocalStorage) as string[]);
    }
    if (monthlyBudgetInLocalStorage) {
      setMonthlyBudget(
        JSON.parse(monthlyBudgetInLocalStorage) as MonthlyBudget
      );
    }
  }, [setCategories, setMonthlyBudget]);

  const addCategory = (category: string) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const removeCategory = (category: string) => {
    const newCategories = categories.filter((c) => c !== category);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  return (
    <React.Fragment>
      <BudgetSetup setMonthlyBudget={setMonthlyBudget} />
      <CategoriesSetup
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
        <Link to='/bills'>Proceed</Link>
      </button>
    </React.Fragment>
  );
};
