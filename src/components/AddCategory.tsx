import { useState } from 'react';

const initialValue: CategoryForm = {
  name: '',
  budget: 0,
};
type Props = {
  addCategory: (category: CategoryForm) => void;
};

function AddCategory(props: Props) {
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(initialValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, budget } = categoryForm;
    if (!name || !budget) {
      alert('Please enter the category and the budget');
      return;
    }
    setCategoryForm(initialValue);
    props.addCategory(categoryForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='h-100 w-full flex items-center justify-center font-sans'
    >
      <div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
        <div className='mb-4'>
          <div className='flex mt-4'>
            <label htmlFor='name'>Enter a category bill</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
              name='name'
              placeholder="'Electricity' or 'Gas' or 'Internet'"
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, name: e.target.value })
              }
              required
            />
            <label htmlFor='budget'>Enter the category budget</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
              name='budget'
              type='number'
              value={categoryForm.budget}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  budget: Number(e.target.value),
                })
              }
              required
            />
            <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddCategory;
