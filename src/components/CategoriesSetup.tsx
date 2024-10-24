import React from 'react';
import AddCategory from './AddCategory';
import { CategoryList } from './CategoryList';

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
      <CategoryList categories={categories} removeCategory={removeCategory} />
    </React.Fragment>
  );
};
