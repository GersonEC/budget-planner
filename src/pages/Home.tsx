import { useEffect, useState } from 'react';
import { hasMonthChanged } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';
import { Loader } from '../components/Loader';

export const Home = () => {
  const navigate = useNavigate();
  const { setMonthlyBudget } = useMonthlyBudget();
  const [status, setStatus] = useState<LoadingStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    const getData = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/monthly-budget`);
        const response = (await data.json()) as MonthlyBudget;
        if (!response) {
          navigate({ to: '/month-setup' });
          setStatus('success');
        } else {
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
              to: '/month-setup',
            });
            setStatus('success');
          } else {
            setMonthlyBudget(monthlyBudget);
            navigate({
              to: '/bills',
            });
            setStatus('success');
          }
        }
      } catch (error) {
        console.log(error);
        setStatus('success');
      }
    };
    getData();
  }, [navigate, setMonthlyBudget]);

  if (status === 'idle' || status === 'loading') return <Loader />;

  return <h1>Home</h1>;
};
