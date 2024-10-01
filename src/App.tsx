import AddCategory from './components/AddCategory';
import BillsTable from './components/BillsTable';
import NavBar from './components/NavBar';

import './App.css';
import { useState } from 'react';

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const addCategory = (category: string) => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
  };

  return (
    <main>
      {shouldShowAddCategory ? (
        <AddCategory addCategory={addCategory} />
      ) : (
        <>
          <NavBar />
          <BillsTable />
        </>
      )}
    </main>
  );
}

export default App;
