import React from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext';
import { Heading } from '../components/Heading';
import { getCurrentMonthInString } from '../lib/utils';

export const Bills = () => {
  const { categories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const categoriesText = categories.map((c) => c.name);

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

  return (
    <React.Fragment>
      <div className=''>
        <Heading variant='title'>Bills of {getCurrentMonthInString()}</Heading>
      </div>
      <MonthlyBills
        bills={monthlyBudget.bills}
        budget={monthlyBudget.budget}
        expenses={monthlyBudget.expenses}
        categories={categoriesText}
        updateBills={updateBills}
      />
    </React.Fragment>
  );
};
