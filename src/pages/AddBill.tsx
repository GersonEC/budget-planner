import { ChangeEvent, useId, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';

const AddBill = () => {
  const { categories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(categories[0]);
  const id = useId();

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount = parseInt((event.target as HTMLInputElement).value, 10);
    if (isNaN(newAmount)) newAmount = 0;
    setAmount(newAmount);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) setDate(date);
  };

  const addBill = (
    id: string,
    amount: number,
    category: string,
    date: Date
  ) => {
    const bill: Bill = { id, amount, category, date };
    const updatedBills = [...(monthlyBudget?.bills || []), bill];
    const updatedMonthlyBudgetBills = {
      ...monthlyBudget,
      budget: monthlyBudget.budget - amount,
      bills: updatedBills,
    };
    setMonthlyBudget(updatedMonthlyBudgetBills);
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

    addBill(id, amount, category || categories[0], date);
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
            <select onChange={(e) => setCategory(e.target.value)}>
              {categories
                ? categories.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
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
