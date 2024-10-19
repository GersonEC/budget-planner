import React from 'react';
import AddCategory from './AddCategory';

interface Props {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const CategoriesSetup: React.FC<Props> = ({
  categories,
  addCategory,
  removeCategory,
}) => {
  return (
    <React.Fragment>
      <AddCategory addCategory={addCategory} />
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}{' '}
            <button name='remove' onClick={() => removeCategory(category)}>
              ⛔️
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
