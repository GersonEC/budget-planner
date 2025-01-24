import { Heading } from '../components/Heading';
import { getCurrentMonthInString, hasMonthChanged } from '../lib/utils';
import { WizardForm } from '../components/WizardForm';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { Loader } from '../components/Loader';

export const MonthSetup = () => {
  const navigate = useNavigate();
  const { setMonthlyBudget } = useMonthlyBudget();
  const [status, setStatus] = useState<LoadingStatus>('idle');

  useEffect(() => {
    try {
      setStatus('loading');
      const getData = async () => {
        const data = await fetch(`http://localhost:3000/api/monthly-budget`);
        if (data.ok) {
          const response = (await data.json()) as MonthlyBudget;
          const monthlyBudget: MonthlyBudget = {
            bills: response.bills,
            budget: response.budget,
            cashflow: response.cashflow,
            expenses: response.expenses,
            month: response.month,
            year: response.year,
          };
          if (hasMonthChanged(monthlyBudget.month)) {
            navigate({
              to: '/',
            });
          } else {
            setMonthlyBudget(monthlyBudget);
            navigate({
              to: '/bills',
            });
          }
          setStatus('success');
        } else {
          navigate({
            to: '/',
          });
          setStatus('success');
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [navigate, setMonthlyBudget]);

  if (status === 'idle' || status === 'loading') return <Loader />;

  return (
    <div className='h-full flex flex-col gap-6 p-4 max-w-4xl items-center justify-center'>
      <Heading variant='title' className='border text-red'>
        Month Setup - {getCurrentMonthInString()}
      </Heading>
      <WizardForm />
    </div>
  );
};
