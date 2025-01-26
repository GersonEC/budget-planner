import React, { useEffect, useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { Heading } from '../components/Heading';
import { deepObjectEqual, getCurrentMonthInString } from '../lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { initialMonthlyBudget } from '../lib/fakes';
import { Loader } from '../components/Loader';

export const Bills = () => {
  const navigate = useNavigate();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const compareMonthlyBudget = () => {
      if (deepObjectEqual(monthlyBudget, initialMonthlyBudget)) {
        navigate({ to: '/' });
      }
      setIsLoading(false);
    };

    compareMonthlyBudget();
  }, [navigate, monthlyBudget]);

  const updateBills = (
    updatedMonthlyBudget: MonthlyBudget,
    newBills: Bill[]
  ) => {
    const newExpenses = newBills.reduce(
      (prevValue, currValue) => prevValue + currValue.amount,
      0
    );
    setMonthlyBudget({
      ...updatedMonthlyBudget,
      bills: newBills,
      expenses: newExpenses,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <div className=''>
        <Heading variant='title'>Bills of {getCurrentMonthInString()}</Heading>
      </div>
      <MonthlyBills
        bills={monthlyBudget.bills}
        budget={monthlyBudget.budget}
        expenses={monthlyBudget.expenses}
        updateBills={updateBills}
      />
    </React.Fragment>
  );
};
