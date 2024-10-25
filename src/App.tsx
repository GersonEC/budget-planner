import React from 'react';
import { MonthlyBudgetProvider } from './context/MonthlyBudgetContext';
import { CategoriesProvider } from './context/CategoriesContext';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { ModeToggle } from './components/ModeToggle';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MonthlyBudgetProvider>
        <CategoriesProvider>
          <div className='App'>
            <ModeToggle />
            {children}
          </div>
        </CategoriesProvider>
      </MonthlyBudgetProvider>
    </ThemeProvider>
  );
};

export default App;
