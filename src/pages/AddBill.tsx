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
import { Label } from '../components/ui/label';

const AddBill = () => {
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [, setCategory] = useState<CategoryForm>();
  const id = useId();
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount: number | string = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
    if (isNaN(newAmount)) newAmount = '';
    setAmount(newAmount);
  };

  const handleChangeCategory = (value: string) => {
    const updatedCategory = categories.find((c) => c.name === value);
    if (updatedCategory) {
      setAllocatedBudget(Number(updatedCategory?.budget));
      setRemainingBudget(
        Number(updatedCategory.budget) - updatedCategory.expenses
      );
      setCategory(updatedCategory);
    }
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
    <div className=''>
      <Heading variant='title'>Add new bill</Heading>
      <div className='flex flex-col items-end mb-2'>
        <div className='flex gap-2'>
          <Label className='text-gray-300 mb-1'>Allocated budget:</Label>
          <Label className='text-yellow-300'>
            {currencyFormat(Number(allocatedBudget))}
          </Label>
        </div>
        <div className='flex gap-2'>
          <Label className='text-gray-300'>Remaining budget:</Label>
          <Label
            className={`${
              remainingBudget <= 0 ? 'text-red-300' : 'text-green-300'
            }`}
          >
            {currencyFormat(Number(remainingBudget))}
          </Label>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <Label htmlFor='category'>Bill category:</Label>
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
          <Label htmlFor='amount'>Bill amount:</Label>
          <Input
            name='amount'
            placeholder='0'
            value={amount}
            onChange={handleChangeAmount}
          />
        </div>
        <div className='flex flex-col'>
          <Label htmlFor='description'>Bill description:</Label>
          <Textarea
            name='description'
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <Label htmlFor='date'>Bill date:</Label>
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
