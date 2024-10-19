import React from 'react';
import { MonthlyBudgetProvider } from './context/MonthlyBudgetContext';
import { CategoriesProvider } from './context/CategoriesContext';
import './App.css';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <MonthlyBudgetProvider>
      <CategoriesProvider>
        <div className='App'>{children}</div>
      </CategoriesProvider>
    </MonthlyBudgetProvider>
  );
};

export default App;
