import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
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
import { CategoriesPieChart } from '../components/CategoriesPieChart';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

export const Categories = () => {
  const { toast } = useToast();
  const { showBoundary } = useErrorBoundary();
  const { categories, setCategories } = useCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const removeCategory = (categoryName: string) => {
    try {
      throw new Error('IMpossible to remove');
      const newCategories = categories.filter((c) => c.name !== categoryName);
      setCategories(newCategories);
      toast({
        variant: 'success',
        title: 'Category removed successfully',
        description: `Category removed: ${categoryName}`,
      });
      const error = new Error('Something went wrong');
      showBoundary(error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: error,
      });
    }
  };

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setIsOpen(false);
  };

  return (
    <div>
      <div className='flex justify-between items-baseline'>
        <Heading variant='title'>Categories</Heading>
        <Button variant='secondary' onClick={() => setIsOpen(true)}>
          Add new category
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
      <CategoriesPieChart />
    </div>
  );
};
