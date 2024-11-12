import React, { useEffect } from 'react';

const initialMonthlyBudget: MonthlyBudget = {
  month: new Date().getMonth(),
  budget: 0,
  expenses: 0,
  cashflow: {
    inflow: 0,
    outflow: 0,
    netflow: 0,
  },
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

  useEffect(() => {
    const monthlyBudgetInSessionStorage =
      sessionStorage.getItem('monthlyBudget');
    if (monthlyBudgetInSessionStorage) {
      setMonthlyBudget(
        JSON.parse(monthlyBudgetInSessionStorage) as MonthlyBudget
      );
    }
  }, []);

  useEffect(() => {
    const inflowInSessionStorage = sessionStorage.getItem('inflow');
    const outflowInSessionStorage = sessionStorage.getItem('outflow');
    if (inflowInSessionStorage && outflowInSessionStorage) {
      const inflow = JSON.parse(inflowInSessionStorage) as FlowList;
      const outflow = JSON.parse(outflowInSessionStorage) as FlowList;
      setBudget({
        ...budget,
        cashflow: {
          inflow: inflow.totalFlow,
          outflow: outflow.totalFlow,
          netflow: inflow.totalFlow - outflow.totalFlow,
        },
      });
    }
  }, []);

  const setMonthlyBudget = (newMonthlyBudget: MonthlyBudget) => {
    setBudget(newMonthlyBudget);
    sessionStorage.setItem('monthlyBudget', JSON.stringify(newMonthlyBudget));
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
