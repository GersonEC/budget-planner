import React from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext copy';

export const Bills = () => {
  const { categories } = useCategories();
  const { monthlyBudget } = useMonthlyBudget();

  return (
    <React.Fragment>
      <MonthlyBills
        bills={monthlyBudget.bills}
        budget={monthlyBudget.budget}
        categories={categories}
      />
    </React.Fragment>
  );
};
