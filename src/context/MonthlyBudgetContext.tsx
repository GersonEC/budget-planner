import React, { useEffect } from 'react';
import { hasMonthChanged } from '../lib/utils';

const initialMonthlyBudget: MonthlyBudget = {
  month: new Date().getMonth(),
  budget: 0,
  expenses: 0,
  cashflow: {
    inflow: {
      flows: [],
      totalFlow: 0,
    },
    outflow: {
      flows: [],
      totalFlow: 0,
    },
    netflow: 0,
  },
  bills: [],
};

const initialBudgetPlanner: BudgetPlanner = [];

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
  const [budgetPlanner, setBudgetPlanner] =
    React.useState<BudgetPlanner>(initialBudgetPlanner);

  /** Check if there is monthly budget in session storage. */
  useEffect(() => {
    const monthlyBudgetInSessionStorage =
      sessionStorage.getItem('monthlyBudget');
    if (monthlyBudgetInSessionStorage) {
      setMonthlyBudget(
        JSON.parse(monthlyBudgetInSessionStorage) as MonthlyBudget
      );
    }
  }, []);

  /** Check if there is cashflow in session storage. */
  useEffect(() => {
    const inflowInSessionStorage = sessionStorage.getItem('inflow');
    const outflowInSessionStorage = sessionStorage.getItem('outflow');
    if (inflowInSessionStorage && outflowInSessionStorage) {
      const inflow = JSON.parse(inflowInSessionStorage) as FlowList;
      const outflow = JSON.parse(outflowInSessionStorage) as FlowList;
      setBudget({
        ...budget,
        cashflow: {
          inflow,
          outflow,
          netflow: inflow.totalFlow - outflow.totalFlow,
        },
      });
    }
  }, []);

  /** Check if the month has changed to reset the monthly budget. */
  useEffect(() => {
    const checkIfNewMonth = () => {
      if (hasMonthChanged()) {
        setBudgetPlanner([...budgetPlanner, budget]);
        setMonthlyBudget(initialMonthlyBudget);
      }
    };
    checkIfNewMonth();
  }, []);

  const setMonthlyBudget = (newMonthlyBudget: MonthlyBudget) => {
    setBudget(newMonthlyBudget);
    sessionStorage.setItem('monthlyBudget', JSON.stringify(newMonthlyBudget));
  };

  const value = {
    monthlyBudget: budget,
    setMonthlyBudget,
    budgetPlanner,
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
