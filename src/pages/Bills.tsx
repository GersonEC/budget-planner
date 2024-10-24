import React from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext';

export const Bills = () => {
  const { categories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const categoriesText = categories.map((c) => c.name);

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
        expenses={monthlyBudget.expenses}
        categories={categoriesText}
        updateBills={updateBills}
      />
    </React.Fragment>
  );
};
