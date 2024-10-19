import React, { useState } from 'react';
import BillsTable from './BillsTable';
import NavBar from './NavBar';

interface Props {
  bills: Bill[];
  budget: number;
  categories: string[];
}
export const MonthlyBills: React.FC<Props> = ({
  bills,
  budget,
  categories,
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

  return (
    <React.Fragment>
      <NavBar
        categories={categories}
        budget={budget}
        showAddCategory={() => {}}
        activeCategory={activeCategory}
        setNewActiveCategory={setNewActiveCategory}
      />
      <BillsTable
        bills={activeBills()}
        removeBill={() => alert('remove bill')}
      />
    </React.Fragment>
  );
};
