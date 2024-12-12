import React from 'react';
import { AddCategoryForm } from './AddCategoryForm';
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
  isOpen,
  setIsOpen,
  addCategory,
  copyFromOutflow,
}) => {
  return (
    <React.Fragment>
      <div className='flex items-center gap-4'>
        <Button variant='outline' onClick={copyFromOutflow}>
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
              <AddCategoryForm addCategory={addCategory} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* <CategoryList categories={categories} removeCategory={removeCategory} /> */}
    </React.Fragment>
  );
};
