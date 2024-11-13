import React, { useEffect } from 'react';
import { MonthlyBudgetProvider } from './context/MonthlyBudgetContext';
import { CategoriesProvider } from './context/CategoriesContext';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { useNavigate } from '@tanstack/react-router';
import { PersonalFinanceProvider } from './context/PersonalFinanceContext';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesInSessionStorage = sessionStorage.getItem('categories');
    const budgetInSessionStorage = sessionStorage.getItem('monthlyBudget');
    if (categoriesInSessionStorage && budgetInSessionStorage) {
      navigate({
        to: '/bills',
      });
    }
  }, [navigate]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <PersonalFinanceProvider>
        <MonthlyBudgetProvider>
          <CategoriesProvider>
            <div className='p-4'>{children}</div>
          </CategoriesProvider>
        </MonthlyBudgetProvider>
      </PersonalFinanceProvider>
    </ThemeProvider>
  );
};

export default App;
