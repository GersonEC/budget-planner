import React from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { useCategories } from '../context/CategoriesContext';
import { Nav } from '../components/Nav';

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
      <Nav />
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
