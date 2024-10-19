import React from 'react';

export type Bill = {
  amount: number;
  category: string;
  date: Date;
};

export type MonthlyBudget = {
  month: number;
  budget: number;
  bills: Bill[];
};

const initialMonthlyBudget: MonthlyBudget = {
  month: new Date().getMonth(),
  budget: 0,
  bills: [],
};

const MonthlyBudgetContext = React.createContext<
  | {
      monthlyBudget: MonthlyBudget;
      setMonthlyBudget: React.Dispatch<React.SetStateAction<MonthlyBudget>>;
    }
  | undefined
>(undefined);

export function MonthlyBudgetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [monthlyBudget, setMonthlyBudget] =
    React.useState<MonthlyBudget>(initialMonthlyBudget);

  const value = { monthlyBudget, setMonthlyBudget };

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
