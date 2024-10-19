import React from 'react';
import AddCategory from './AddCategory';
import { Link } from '@tanstack/react-router';
import { useCategories } from '../context/CategoriesContext copy';

export const CategoriesSetup = () => {
  const { categories, setCategories } = useCategories();

  const addCategory = (category: string) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleRemove = (category: string) => {
    const newCategories = categories.filter((c) => c !== category);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  return (
    <React.Fragment>
      <AddCategory addCategory={addCategory} />
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}{' '}
            <button name='remove' onClick={() => handleRemove(category)}>
              ⛔️
            </button>
          </li>
        ))}
      </ul>
      <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
        <Link to='/budget'>Proceed</Link>
      </button>
    </React.Fragment>
  );
};
