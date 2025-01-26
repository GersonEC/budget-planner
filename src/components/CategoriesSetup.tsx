import React from 'react';
import { AddOutflowForm } from './AddOutflowForm';
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
  addOutflow: (outflow: Flow) => void;
  copyFromOutflow: () => void;
  removeCategory: (category: string) => void;
}

export const CategoriesSetup: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  addOutflow,
  copyFromOutflow,
}) => {
  return (
    <React.Fragment>
      <div className='flex items-center gap-4'>
        <Button variant='outline' onClick={copyFromOutflow}>
          Copy from Outflow
        </Button>
        <p>Or</p>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DialogTrigger
            className='hover:underline'
            onClick={() => setIsOpen(true)}
          >
            <Button variant={'outline'}>Add new Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Category</DialogTitle>
              <DialogDescription>insert a new category</DialogDescription>
              <AddOutflowForm addOutflow={addOutflow} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* <CategoryList categories={categories} removeCategory={removeCategory} /> */}
    </React.Fragment>
  );
};
