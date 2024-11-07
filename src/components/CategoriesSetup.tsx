import React from 'react';
import AddCategory from './AddCategory';
import { CategoryList } from './CategoryList';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Props {
  categories: CategoryForm[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addCategory: (category: CategoryForm) => void;
  copyFromOutflow: () => void;
  removeCategory: (category: string) => void;
}

export const CategoriesSetup: React.FC<Props> = ({
  categories,
  isOpen,
  setIsOpen,
  addCategory,
  copyFromOutflow,
  removeCategory,
}) => {
  return (
    <React.Fragment>
      <div className='flex items-baseline gap-4'>
        <Button variant='secondary' onClick={copyFromOutflow}>
          Copy from Outflow
        </Button>
        <p>Or</p>
        <Dialog open={isOpen}>
          <DialogTrigger
            className='hover:underline'
            onClick={() => setIsOpen(true)}
          >
            Add new Category
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Category</DialogTitle>
              <DialogDescription>insert a new category</DialogDescription>
              <AddCategory addCategory={addCategory} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <CategoryList categories={categories} removeCategory={removeCategory} />
    </React.Fragment>
  );
};
