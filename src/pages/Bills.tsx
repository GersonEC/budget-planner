import React from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext';

export const Bills = () => {
  const { categories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();

  const updateBills = (newBills: Bill[]) => {
    setMonthlyBudget({
      ...monthlyBudget,
      bills: newBills,
    });
  };

  return (
    <React.Fragment>
      <MonthlyBills
        bills={monthlyBudget.bills}
        budget={monthlyBudget.budget}
        categories={categories}
        updateBills={updateBills}
      />
    </React.Fragment>
  );
};
