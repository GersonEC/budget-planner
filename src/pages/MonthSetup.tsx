import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FlowForm } from '../components/FlowForm';

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

  const handleProceed = () => {
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
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl'>Cashflow Setting</h1>

      {/** TODO: SHOW ADD INFLOW BOOLEAN VALUE */}
      <h2>Inflow</h2>
      <FlowForm type='inflow' />
      <h2>Outflow</h2>
      <FlowForm type='outflow' />

      <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      <CategoriesSetup
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  );
};
