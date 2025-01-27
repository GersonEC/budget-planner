import React, { useEffect } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { MonthlyBills } from '../components/MonthlyBills';
import { Heading } from '../components/Heading';
import { deepObjectEqual, getCurrentMonthInString } from '../lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { initialMonthlyBudget } from '../lib/fakes';
import { patchMonthlyBudget } from '../api/patchMonthlyBudget';

export const Bills = () => {
  const navigate = useNavigate();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();

  useEffect(() => {
    const compareMonthlyBudget = () => {
      if (deepObjectEqual(monthlyBudget, initialMonthlyBudget)) {
        navigate({ to: '/' });
      }
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
    try {
      const dataToUpdate = {
        bills: newBills,
        cashflow: {
          outflow: {
            flows: updatedMonthlyBudget.cashflow.outflow.flows,
            totalFlow: updatedMonthlyBudget.cashflow.outflow.totalFlow,
          },
        },
        expenses: newExpenses,
      };
      patchMonthlyBudget(updatedMonthlyBudget.id, dataToUpdate);
      setMonthlyBudget({
        ...updatedMonthlyBudget,
        bills: newBills,
        expenses: newExpenses,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
