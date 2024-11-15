import React, { useEffect } from 'react';
import { hasMonthChanged, isThereMonthlyBudgetInMemory } from '../lib/utils';
import { initialBudgetPlanner, initialMonthlyBudget } from '../lib/fakes';

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
  const [budget, setBudget] = React.useState<MonthlyBudget>(
    isThereMonthlyBudgetInMemory() || initialMonthlyBudget
  );
  const [budgetPlanner, setBudgetPlanner] =
    React.useState<BudgetPlanner>(initialBudgetPlanner);

  /** Check if there is cashflow in session storage. */
  useEffect(() => {
    const inflowInSessionStorage = localStorage.getItem('inflow');
    const outflowInSessionStorage = localStorage.getItem('outflow');
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
      const currentMonth: number = budget.month;
      if (hasMonthChanged(currentMonth)) {
        const newBudgetPlanner = [...budgetPlanner, budget];
        setBudgetPlanner(newBudgetPlanner);
        localStorage.setItem(
          'budget-planner',
          JSON.stringify(newBudgetPlanner)
        );
        localStorage.removeItem('inflow');
        localStorage.removeItem('outflow');
        localStorage.removeItem('categories');
        localStorage.removeItem('monthlyBudget');
      }
    };
    checkIfNewMonth();
  }, []);

  const setMonthlyBudget = (newMonthlyBudget: MonthlyBudget) => {
    setBudget(newMonthlyBudget);
    localStorage.setItem('monthlyBudget', JSON.stringify(newMonthlyBudget));
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
