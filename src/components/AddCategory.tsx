import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const initialValue: CategoryForm = {
  name: '',
  budget: '',
  expenses: 0,
};
type Props = {
  addCategory: (category: CategoryForm) => void;
};

function AddCategory(props: Props) {
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(initialValue);

  const handleAddCategory = () => {
    const { name, budget } = categoryForm;
    if (!name || !budget) {
      alert('Please enter the category and the budget');
      return;
    }
    setCategoryForm(initialValue);
    props.addCategory(categoryForm);
  };

  return (
    <div className='flex flex-col gap-2'>
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
      <Button
        className='w-full'
        onClick={handleAddCategory}
        variant={'secondary'}
      >
        Add Category
      </Button>
    </div>
  );
}

export default AddCategory;
