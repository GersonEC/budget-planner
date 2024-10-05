import AddCategory from './components/AddCategory';
import BillsTable from './components/BillsTable';
import NavBar from './components/NavBar';

import './App.css';
import { useEffect, useState } from 'react';
import AddBill from './components/AddBill';

export type Bill = {
  amount: number;
  category: string;
  date: Date;
};

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const categoriesInLocalStorage = localStorage.getItem('categories');
    const billsInLocalStorage = localStorage.getItem('bills');

    if (categoriesInLocalStorage) {
      setCategories(JSON.parse(categoriesInLocalStorage) as string[]);
    } else {
      setShouldShowAddCategory(true);
    }

    if (billsInLocalStorage) {
      setBills(JSON.parse(billsInLocalStorage) as Bill[]);
    } else {
      setShouldShowAddBill(true);
    }
  }, []);

  const activeBills = () => {
    return bills
      ?.filter((bill) =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const addCategory = (category: string) => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };

  const addBill = (amount: number, category: string, date: Date) => {
    const bill: Bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  const removeBill = (index: number) => {
    let updatedBills = [...bills];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const setNewActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className='App'>
      {shouldShowAddCategory ? (
        <AddCategory addCategory={addCategory} />
      ) : shouldShowAddBill ? (
        <AddBill addBill={addBill} categories={categories} />
      ) : (
        <div>
          <NavBar
            categories={categories}
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
