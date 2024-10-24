import React from 'react';

const initialMonthlyBudget: MonthlyBudget = {
  month: new Date().getMonth(),
  budget: 0,
  expenses: 0,
  bills: [],
};

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
    localStorage.setItem('monthlyBudget', JSON.stringify(newMonthlyBudget));
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
