import { ChangeEvent, useId, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';

const AddBill = () => {
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(categories[0]);
  const id = useId();
  const allocatedBudget = category.budget;
  const remainingBudget = category.budget - category.expenses;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeCategory = (e: any) => {
    const newCategory = categories.find((c) => c.name === e.target.value);
    if (newCategory) setCategory(newCategory);
  };
  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount = parseInt((event.target as HTMLInputElement).value, 10);
    if (isNaN(newAmount)) newAmount = 0;
    setAmount(newAmount);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) setDate(date);
  };

  const updateMonthlyBudgetBill = (
    id: string,
    amount: number,
    category: string,
    date: Date
  ) => {
    const bill: Bill = { id, amount, category, date };
    const updatedBills = [...(monthlyBudget?.bills || []), bill];
    const updatedMonthlyBudgetBills = {
      ...monthlyBudget,
      expenses: monthlyBudget.expenses + amount,
      bills: updatedBills,
    };
    setMonthlyBudget(updatedMonthlyBudgetBills);
  };

  const updateMonthlyCategoryBudget = (amount: number, category: string) => {
    const newCategories = [...categories];
    const index = newCategories.findIndex((c) => c.name === category);
    if (typeof index === 'number') {
      newCategories[index].expenses += amount;
      setCategories(newCategories);
    }
  };

  const addBill = (
    id: string,
    amount: number,
    category: string,
    date: Date
  ) => {
    updateMonthlyBudgetBill(id, amount, category, date);
    updateMonthlyCategoryBudget(amount, category);
    navigate({
      to: '/bills',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    addBill(id, amount, category.name || categories[0].name, date);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='h-100 w-full flex items-center justify-center font-sans'
    >
      <div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
        <div className='mb-4'>
          <h1 className='text-grey-darkest'>Enter a new bill</h1>
          <div className='flex mt-4'>
            <select onChange={handleChangeCategory}>
              {categories
                ? categories.map((value, index) => {
                    return (
                      <option key={index} value={value.name}>
                        {value.name}
                      </option>
                    );
                  })
                : ''}
            </select>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
              placeholder='Add category'
              value={amount}
              onChange={handleChangeAmount}
            />
            <div className='mt-2 ml-1'>
              <DatePicker selected={date} onChange={handleChangeDate} />
            </div>
            <p>Allocated budget: {allocatedBudget}</p>
            <p>Remaining budget: {remainingBudget}</p>
            <button className='flex-no-shrink p-2 border-2 rounded bg-teal bg-green-500 text-white border-teal hover:text-white hover:bg-teal'>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBill;