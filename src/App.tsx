import React, { useEffect } from 'react';
import { MonthlyBudgetProvider } from './context/MonthlyBudgetContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ThemeProvider } from './context/ThemeContext';
import { useNavigate } from '@tanstack/react-router';
import { PersonalFinanceProvider } from './context/PersonalFinanceContext';
import { Toaster } from './components/ui/toaster';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Nav } from './components/Nav';
import { Error } from './pages/Error';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesInSessionStorage = localStorage.getItem('categories');
    const budgetInSessionStorage = localStorage.getItem('monthlyBudget');
    if (!budgetInSessionStorage) {
      navigate({
        to: '/',
      });
    } else if (categoriesInSessionStorage && budgetInSessionStorage) {
      navigate({
        to: '/bills',
      });
    }
  }, [navigate]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ErrorBoundary FallbackComponent={() => <Error />}>
        <PersonalFinanceProvider>
          <MonthlyBudgetProvider>
            <CategoriesProvider>
              <div className='p-2 max-w-xl m-auto sm:w-full'>
                <Nav />
                <Toaster />
                {children}
              </div>
            </CategoriesProvider>
          </MonthlyBudgetProvider>
        </PersonalFinanceProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
