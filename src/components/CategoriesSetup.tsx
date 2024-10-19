import React from 'react';
import AddCategory from './AddCategory';

interface Props {
  categories: CategoryForm[];
  addCategory: (category: CategoryForm) => void;
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
          <li key={category.name}>
            {category.name}{' '}
            <button name='remove' onClick={() => removeCategory(category.name)}>
              ⛔️
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
