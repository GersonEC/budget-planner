import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FlowForm } from '../components/FlowForm';
import { CashFlow } from './Cashflow';
import { Heading } from '../components/Heading';

export const MonthSetup = () => {
  const [budget, setBudget] = useState<number | string>('');
  const { categories, setCategories } = useCategories();
  const { setMonthlyBudget } = useMonthlyBudget();
  const [isThereCashflow, setIsThereCashflow] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inflowsInSessionStorage = sessionStorage.getItem('inflow');
    const outflowsInSessionStorage = sessionStorage.getItem('outflow');
    if (inflowsInSessionStorage && outflowsInSessionStorage) {
      setIsThereCashflow(true);
    }
  }, []);

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
      budget: Number(budget),
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
      <Heading variant='title'>Month Setup</Heading>
      {isThereCashflow ? (
        <CashFlow />
      ) : (
        <div>
          <Heading variant='subtitle'>Cashflow Setting</Heading>
          <h2>Inflow</h2>
          <FlowForm type='inflow' />
          <h2>Outflow</h2>
          <FlowForm type='outflow' />
        </div>
      )}
      <Heading variant='subtitle'>Budget Setting</Heading>
      <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      <Heading variant='subtitle'>Categories Setting</Heading>
      <CategoriesSetup
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  );
};
