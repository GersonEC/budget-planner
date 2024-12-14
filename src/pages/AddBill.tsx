import { ChangeEvent, useId, useState } from 'react';
import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DatePicker } from '../components/ui/date-picker';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Heading } from '../components/Heading';
import { currencyFormat } from '../lib/utils';

const AddBill = () => {
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(categories[0]);
  const id = useId();
  const allocatedBudget = category ? category.budget : 0;
  const remainingBudget = category
    ? Number(category.budget) - category.expenses
    : 0;

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount = parseInt((event.target as HTMLInputElement).value, 10);
    if (isNaN(newAmount)) newAmount = 0;
    setAmount(newAmount);
  };

  const handleChangeCategory = (value: string) => {
    const updatedCategory = categories.find((c) => c.name === value);
    if (updatedCategory) setCategory(updatedCategory);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newCategory = categories.find(
      (c) => c.name === event.currentTarget[1].value
    );
    if (newCategory) {
      if (!amount) {
        alert('Please enter an amount');
        return;
      }
      setCategory(newCategory);
      addBill(
        id,
        Number(amount),
        newCategory.name || categories[0].name,
        date,
        description
      );
    }
  };

  return (
    <div>
      <Heading variant='title'>Add new bill</Heading>
      <div className='border p-2 flex justify-between mb-2'>
        <div className='flex gap-2'>
          <p className='text-gray-300 text-sm'>Allocated budget:</p>
          <p className='text-yellow-300 font-semibold text-sm'>
            {currencyFormat(Number(allocatedBudget))}
          </p>
        </div>
        <div className='flex gap-2'>
          <p className='text-gray-300 text-sm'>Remaining budget:</p>
          <p className='text-green-300 font-semibold text-sm'>
            {currencyFormat(Number(remainingBudget))}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label className='text-sm text-slate-300' htmlFor='category'>
            Bill category:
          </label>
          <Select
            name='category'
            onValueChange={(value) => handleChangeCategory(value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Choose a category...' />
            </SelectTrigger>
            <SelectContent>
              {categories
                ? categories.map((value, index) => {
                    return (
                      <SelectItem key={index} value={value.name}>
                        {value.name}
                      </SelectItem>
                    );
                  })
                : ''}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm text-slate-300' htmlFor='amount'>
            Bill amount:
          </label>
          <Input name='amount' value={amount} onChange={handleChangeAmount} />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm text-slate-300' htmlFor='description'>
            Bill description:
          </label>
          <Textarea
            name='description'
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm text-slate-300' htmlFor='date'>
            Bill date:
          </label>
          <DatePicker date={date} setDate={handleChangeDate} />
        </div>
        <Button type='submit' className='w-full'>
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddBill;
