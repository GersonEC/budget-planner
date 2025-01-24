import React, { useEffect, useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext';
import { Heading } from '../components/Heading';
import { deepObjectEqual, getCurrentMonthInString } from '../lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { initialMonthlyBudget } from '../lib/fakes';
import { Loader } from '../components/Loader';

export const Bills = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const categoriesText = categories.map((c) => c.name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const compareMonthlyBudget = () => {
      if (deepObjectEqual(monthlyBudget, initialMonthlyBudget)) {
        navigate({ to: '/' });
      }
      setIsLoading(false);
    };

    compareMonthlyBudget();
  }, [navigate, monthlyBudget]);

  const updateBills = (newBills: Bill[]) => {
    const newExpenses = newBills.reduce(
      (prevValue, currValue) => prevValue + currValue.amount,
      0
    );
    setMonthlyBudget({
      ...monthlyBudget,
      bills: newBills,
      expenses: newExpenses,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <div className=''>
        <Heading variant='title'>Bills of {getCurrentMonthInString()}</Heading>
      </div>
      <MonthlyBills
        bills={monthlyBudget.bills}
        budget={monthlyBudget.budget}
        expenses={monthlyBudget.expenses}
        categoryNames={categoriesText}
        updateBills={updateBills}
      />
    </React.Fragment>
  );
};
