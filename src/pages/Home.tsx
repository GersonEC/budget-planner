import { useEffect, useState } from 'react';
import { hasMonthChanged } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';
import { Loader } from '../components/Loader';
import { getMonthlyBudget } from '../api/getMonthlyBudget';

export const Home = () => {
  const navigate = useNavigate();
  const { setMonthlyBudget } = useMonthlyBudget();
  const [status, setStatus] = useState<LoadingStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    const getData = async () => {
      try {
        const data = await getMonthlyBudget();
        if (!data) {
          navigate({ to: '/month-setup' });
          setStatus('success');
        } else {
          const monthlyBudget: MonthlyBudget = {
            id: data.id,
            bills: data.bills,
            budget: data.budget,
            cashflow: data.cashflow,
            expenses: data.expenses,
            month: data.month,
            year: data.year,
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
