import React from 'react';
import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Link } from '@tanstack/react-router';

export const MonthSetup = () => {
  const { categories, setCategories } = useCategories();
  const { setMonthlyBudget } = useMonthlyBudget();

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
  };

  const removeCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
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
