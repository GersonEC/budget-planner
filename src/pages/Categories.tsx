import { useState } from 'react';
import AddCategory from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import { useCategories } from '../context/CategoriesContext';
import { Nav } from '../components/Nav';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Heading } from '../components/Heading';

export const Categories = () => {
  const { categories, setCategories } = useCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const removeCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
  };

  const addCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setIsOpen(false);
  };

  return (
    <div>
      <Nav />
      <div className='flex gap-4 justify-between'>
        <Heading variant='title'>Categories</Heading>
      </div>

      <Dialog open={isOpen}>
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsOpen(true)}
        >
          Add new category
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Category</DialogTitle>
            <DialogDescription>
              insert the data about your new category.
            </DialogDescription>
            <AddCategory addCategory={addCategory} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CategoryList categories={categories} removeCategory={removeCategory} />
    </div>
  );
};
