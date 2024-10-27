import { useState } from 'react';
import AddCategory from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import { useCategories } from '../context/CategoriesContext';
import { Button } from '../components/ui/button';
import { Nav } from '../components/Nav';

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
      <Nav />
      <div className='flex gap-4 justify-between'>
        <h1 className='text-xl'>Categories</h1>
        <Button variant={'link'} onClick={() => setShowAddCategory(true)}>
          Add new category
        </Button>
      </div>
      {/** TODO: show it in a modal */}
      {showAddCategory && <AddCategory addCategory={addCategory} />}
      <CategoryList categories={categories} removeCategory={removeCategory} />
    </div>
  );
};
