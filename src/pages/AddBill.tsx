import { ChangeEvent, useId, useState } from 'react';
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
import { currencyFormat, updateOutflows } from '../lib/utils';
import { Label } from '../components/ui/label';

const AddBill = () => {
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [, setOutflow] = useState<Flow>();
  const id = useId();
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  const outflows = monthlyBudget.cashflow.outflow.flows;

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount: number | string = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
    if (isNaN(newAmount)) newAmount = '';
    setAmount(newAmount);
  };

  const handleChangeCategory = (value: string) => {
    const updatedOutflow = outflows.find((c) => c.name === value);
    if (updatedOutflow) {
      setAllocatedBudget(Number(updatedOutflow?.quantity));
      setRemainingBudget(
        Number(updatedOutflow.quantity) - (updatedOutflow.expenses || 0)
      );
      setOutflow(updatedOutflow);
    }
  };

  const handleChangeDate = (newDate: Date | undefined) => {
    if (newDate) setDate(newDate);
  };

  const updateMonthlyBudgetBill = (
    id: string,
    amount: number,
    outflowName: string,
    date: Date,
    description: string
  ): MonthlyBudget => {
    const bill: Bill = { id, amount, outflowName, date, description };
    const updatedBills = [...(monthlyBudget?.bills || []), bill];
    const updatedMonthlyBudgetBills = {
      ...monthlyBudget,
      expenses: monthlyBudget.expenses + amount,
      bills: updatedBills,
    };
    setMonthlyBudget(updatedMonthlyBudgetBills);
    return updatedMonthlyBudgetBills;
  };

  const updateMonthlyOutflowBudget = (amount: number, outflowName: string) => {
    const newOutflows = [...outflows];
    const index = newOutflows.findIndex((c) => c.name === outflowName);
    console.log(newOutflows[index].expenses);
    if (typeof index === 'number') {
      let currentOutflow: Flow = newOutflows[index];
      currentOutflow = {
        ...currentOutflow,
        expenses: (currentOutflow.expenses || 0) + amount,
      };
      newOutflows[index] = currentOutflow;
      const updatedMonthlyBudgetBills = updateOutflows(
        monthlyBudget,
        newOutflows
      );
      console.log({ updatedMonthlyBudgetBills });
      setMonthlyBudget(updatedMonthlyBudgetBills);
    }
  };

  const addBill = (
    id: string,
    amount: number,
    outflow: string,
    date: Date,
    description: string
  ) => {
    updateMonthlyBudgetBill(id, amount, outflow, date, description);
    updateMonthlyOutflowBudget(amount, outflow);
    navigate({
      to: '/bills',
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newOutflow = outflows.find(
      (c) => c.name === event.currentTarget[1].value
    );
    if (newOutflow) {
      if (!amount) {
        alert('Please enter an amount');
        return;
      }
      setOutflow(newOutflow);
      addBill(
        id,
        Number(amount),
        newOutflow.name || outflows[0].name,
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
              {outflows
                ? outflows.map((value, index) => {
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
