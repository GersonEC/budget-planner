import { useState } from 'react';
import { AddCategoryForm } from '../components/AddCategoryForm';
import { CategoryList } from '../components/CategoryList';
import { useCategories } from '../context/CategoriesContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Heading } from '../components/Heading';
// import { CategoriesPieChart } from '../components/CategoriesPieChart';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

export const Categories = () => {
  const { toast } = useToast();
  const { categories, setCategories } = useCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const removeCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
    toast({
      variant: 'success',
      title: 'Category removed successfully',
    });
  };

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setIsOpen(false);
  };

  return (
    <div>
      <Heading variant='title'>Categories</Heading>
      <div className='flex justify-center'>
        <Button variant='link' onClick={() => setIsOpen(true)}>
          <span className='text-orange-400'>Add new category</span>
        </Button>
      </div>
      {/**TODO: Move subscription dialog into a separate component */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Category</DialogTitle>
            <DialogDescription>
              insert the data about your new category.
            </DialogDescription>
            <AddCategoryForm addCategory={addCategory} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CategoryList categories={categories} removeCategory={removeCategory} />
      {/* <CategoriesPieChart /> */}
    </div>
  );
};
