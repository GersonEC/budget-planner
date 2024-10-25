import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const MonthSetup = () => {
  const [budget, setBudget] = useState<number>(0);
  const { categories, setCategories } = useCategories();
  const { setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();

  const handleSetBudget = (newBudget: number) => {
    setBudget(newBudget);
  };

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
  };

  const removeCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    navigate({
      to: '/bills',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      <CategoriesSetup
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <Button type='submit'>Proceed</Button>
    </form>
  );
};
