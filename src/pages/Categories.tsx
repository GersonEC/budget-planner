import { useState } from 'react';
import AddCategory from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import { useCategories } from '../context/CategoriesContext';
import { Link } from '@tanstack/react-router';

export const Categories = () => {
  const { categories, setCategories } = useCategories();
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

  const removeCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
  };

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setShowAddCategory(false);
  };

  return (
    <div>
      <Link to='/bills'>⬅ Go to Bills</Link>
      <div className='flex gap-4'>
        <h1>Categories</h1>
        <button onClick={() => setShowAddCategory(true)}>Add</button>
      </div>
      {/** TODO: show it in a modal */}
      {showAddCategory && <AddCategory addCategory={addCategory} />}
      <CategoryList categories={categories} removeCategory={removeCategory} />
    </div>
  );
};
