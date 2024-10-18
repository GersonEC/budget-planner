import AddCategory from './components/AddCategory';
import BillsTable from './components/BillsTable';
import NavBar from './components/NavBar';

import './App.css';
import { useEffect, useState } from 'react';
import AddBill from './components/AddBill';
import { MonthSetup } from './components/MonthSetup';

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

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [monthlyBudgetBills, setMonthlyBudgetBills] =
    useState<MonthlyBudget>(initialMonthlyBudget);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [shouldShowAddMonthlyBudget, setShouldShowAddMonthlyBudget] =
    useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const categoriesInLocalStorage = localStorage.getItem('categories');
    const billsInLocalStorage = localStorage.getItem('monthlyBudgetBills');

    if (categoriesInLocalStorage) {
      setCategories(JSON.parse(categoriesInLocalStorage) as string[]);
    } else {
      setShouldShowAddCategory(true);
    }

    if (billsInLocalStorage) {
      setMonthlyBudgetBills(JSON.parse(billsInLocalStorage) as MonthlyBudget);
    } /*else {
      setShouldShowAddBill(true);
    }*/
  }, []);

  const activeBills = () => {
    return monthlyBudgetBills.bills
      ?.filter((bill) =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const addCategory = (category: string) => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    setShouldShowAddMonthlyBudget(true);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };

  const addBill = (amount: number, category: string, date: Date) => {
    const bill: Bill = { amount, category, date };
    const updatedMonthlyBudgetBills = [
      ...(monthlyBudgetBills?.bills || []),
      bill,
    ];
    setMonthlyBudgetBills({
      month: new Date().getMonth(),
      budget: 0,
      bills: updatedMonthlyBudgetBills,
    });
    setShouldShowAddBill(false);
    setShouldShowAddMonthlyBudget(true);
    localStorage.setItem(
      'monthlyBudgetBills',
      JSON.stringify(updatedMonthlyBudgetBills)
    );
  };

  const addMonthlyBudget = (amount: number) => {
    const updatedMonthlyBudgetBills = {
      month: new Date().getMonth(),
      budget: amount,
      bills: [...(monthlyBudgetBills?.bills || [])],
    };
    setMonthlyBudgetBills(updatedMonthlyBudgetBills);
    setShouldShowAddMonthlyBudget(false);
    setShouldShowAddCategory(false);
    localStorage.setItem(
      'monthlyBudgetBills',
      JSON.stringify(updatedMonthlyBudgetBills)
    );
  };

  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  const removeBill = (index: number) => {
    let updatedBills = [...(monthlyBudgetBills?.bills || [])];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    const updatedMonthlyBudgetBills = {
      ...monthlyBudgetBills,
      bills: updatedBills,
    };
    setMonthlyBudgetBills(updatedMonthlyBudgetBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const setNewActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  console.log({ shouldShowAddMonthlyBudget });
  if (shouldShowAddBill) {
    return <AddBill addBill={addBill} categories={categories} />;
  }

  if (shouldShowAddMonthlyBudget) {
    return <MonthSetup addMonthlyBudget={addMonthlyBudget} />;
  }

  return (
    <div className='App'>
      {shouldShowAddCategory ? (
        <AddCategory addCategory={addCategory} />
      ) : (
        <div>
          <NavBar
            categories={categories}
            budget={monthlyBudgetBills.budget}
            showAddCategory={showAddCategory}
            activeCategory={activeCategory}
            setNewActiveCategory={setNewActiveCategory}
          />
          <div className='container flex'>
            <BillsTable
              bills={activeBills()}
              showAddBill={showAddBill}
              removeBill={removeBill}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
