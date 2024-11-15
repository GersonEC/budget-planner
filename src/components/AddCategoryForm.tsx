import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { initialCategoryValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { currencyFormat } from '../lib/utils';

type Props = {
  addCategory: (category: CategoryForm) => void;
};

export const AddCategoryForm: React.FC<Props> = (props) => {
  const { toast } = useToast();
  const [categoryForm, setCategoryForm] =
    useState<CategoryForm>(initialCategoryValue);

  const handleAddCategory = () => {
    const { name, budget } = categoryForm;
    if (!name || !budget) {
      alert('Please enter the category and the budget');
      return;
    }
    setCategoryForm(initialCategoryValue);
    props.addCategory(categoryForm);
    toast({
      variant: 'success',
      title: 'Category added successfully',
      description: `New category: ${name} - ${currencyFormat(Number(budget))}`,
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 mt-2'>
        <div>
          <label htmlFor='name'>Category name</label>
          <Input
            className='bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3'
            name='name'
            placeholder='experiences...'
            value={categoryForm.name}
            onChange={(e) =>
              setCategoryForm({
                ...categoryForm,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor='budget'>Category budget</label>
          <Input
            className='bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3'
            name='budget'
            type='number'
            value={categoryForm.budget}
            onChange={(e) =>
              setCategoryForm({
                ...categoryForm,
                budget: Number(e.target.value),
              })
            }
          />
        </div>
      </div>
      <Button className='w-full' onClick={handleAddCategory}>
        Add Category
      </Button>
    </div>
  );
};
