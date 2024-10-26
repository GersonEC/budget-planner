import { ChangeEvent, useId, useState } from 'react';
import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DatePicker } from '../components/ui/date-picker';

const AddBill = () => {
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(categories[0]);
  const id = useId();
  const allocatedBudget = category ? category.budget : 0;
  const remainingBudget = category ? category.budget - category.expenses : 0;

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

  const handleChangeDate = (newDate: Date | undefined) => {
    if (newDate) setDate(newDate);
  };

  const updateMonthlyBudgetBill = (
    id: string,
    amount: number,
    category: string,
    date: Date,
    description: string
  ) => {
    const bill: Bill = { id, amount, category, date, description };
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
    date: Date,
    description: string
  ) => {
    updateMonthlyBudgetBill(id, amount, category, date, description);
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

    addBill(id, amount, category.name || categories[0].name, date, description);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <p>Allocated budget: {allocatedBudget}</p>
      <p>Remaining budget: {remainingBudget}</p>
      <label htmlFor='category'>Bill category:</label>
      <select
        className='bg-zinc-800 p-2 rounded'
        name='category'
        onChange={handleChangeCategory}
      >
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
      <div>
        <label htmlFor='amount'>Bill amount:</label>
        <Input
          className='bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3'
          name='amount'
          value={amount}
          onChange={handleChangeAmount}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='description'>Bill description:</label>
        <textarea
          className='bg-zinc-800 rounded py-2 px-3'
          name='description'
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='date'>Bill date:</label>
        <DatePicker date={date} setDate={handleChangeDate} />
      </div>
      <Button className='w-full'>Add</Button>
    </form>
  );
};

export default AddBill;
