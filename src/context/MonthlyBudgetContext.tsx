import React from 'react';
import { initialMonthlyBudget } from '../lib/fakes';

const MonthlyBudgetContext = React.createContext<
  | {
      monthlyBudget: MonthlyBudget;
      setMonthlyBudget: (newMonthlyBudget: MonthlyBudget) => void;
    }
  | undefined
>(undefined);

export function MonthlyBudgetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [budget, setBudget] =
    React.useState<MonthlyBudget>(initialMonthlyBudget);

  const setMonthlyBudget = (newMonthlyBudget: MonthlyBudget) => {
    setBudget(newMonthlyBudget);
  };

  const value = {
    monthlyBudget: budget,
    setMonthlyBudget,
  };

  return (
    <MonthlyBudgetContext.Provider value={value}>
      {children}
    </MonthlyBudgetContext.Provider>
  );
}

export function useMonthlyBudget() {
  const context = React.useContext(MonthlyBudgetContext);

  if (context === undefined) {
    throw new Error(
      'useMonthlyBudget must be used within a MonthlyBudgetProvider'
    );
  }

  return context;
}
