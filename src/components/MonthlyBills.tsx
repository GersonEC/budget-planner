import React, { useState } from 'react';
import BillsTable from './BillsTable';
import NavBar from './NavBar';

interface Props {
  bills: Bill[];
  budget: number;
  categories: string[];
  updateBills: (newBills: Bill[]) => void;
}
export const MonthlyBills: React.FC<Props> = ({
  bills,
  budget,
  categories,
  updateBills,
}) => {
  const [activeCategory, setActiveCategory] = useState('');

  const activeBills = () => {
    return bills
      ?.filter((bill) =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const setNewActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  const removeBill = (id: string) => {
    const newBills = bills.filter((b) => b.id !== id);
    updateBills(newBills);
  };

  return (
    <React.Fragment>
      <NavBar
        categories={categories}
        budget={budget}
        showAddCategory={() => {}}
        activeCategory={activeCategory}
        setNewActiveCategory={setNewActiveCategory}
      />
      <BillsTable bills={activeBills()} removeBill={removeBill} />
    </React.Fragment>
  );
};
