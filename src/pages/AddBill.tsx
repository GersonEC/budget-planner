import { ChangeEvent, useEffect, useId, useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';
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
import { currencyFormat, deepObjectEqual, updateOutflows } from '../lib/utils';
import { Label } from '../components/ui/label';
import { initialMonthlyBudget } from '../lib/fakes';
import { patchMonthlyBudget } from '../api/patchMonthlyBudget';
import { ButtonWithLoading } from '../components/ButtonWithLoading';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { HandCoins } from 'lucide-react';

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
  const [status, setStatus] = useState<LoadingStatus>('idle');
  const [isAvailableOutflowsOpen, setIsAvailableOutflowsOpen] = useState(false);

  const outflows = monthlyBudget.cashflow.outflow.flows;

  useEffect(() => {
    if (deepObjectEqual(monthlyBudget, initialMonthlyBudget)) {
      navigate({ to: '/' });
    }
  }, [navigate, monthlyBudget]);

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount: number | string = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
    if (isNaN(newAmount)) newAmount = '';
    setAmount(newAmount);
  };

  const handleChangeOutflow = (value: string) => {
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

  const updateMonthlyOutflowBudget = (
    updatedMonthlyBudget: MonthlyBudget,
    amount: number,
    outflowName: string
  ) => {
    const newOutflows = [...outflows];
    const index = newOutflows.findIndex((c) => c.name === outflowName);
    if (typeof index === 'number') {
      let currentOutflow: Flow = newOutflows[index];
      currentOutflow = {
        ...currentOutflow,
        expenses: (currentOutflow.expenses || 0) + amount,
      };
      newOutflows[index] = currentOutflow;
      const updatedMonthlyBudgetBills = updateOutflows(
        updatedMonthlyBudget,
        newOutflows
      );
      return updatedMonthlyBudgetBills;
    }
  };

  const updateMonthlyBudgetBill = (
    id: string,
    amount: number,
    outflowName: string,
    date: Date,
    description: string
  ): MonthlyBudget | undefined => {
    const bill: Bill = { id, amount, outflowName, date, description };
    const updatedBills = [...(monthlyBudget?.bills || []), bill];
    const updatedMonthlyBudgetBills = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
      },
      expenses: monthlyBudget.expenses + amount,
      bills: updatedBills,
    };
    const updatedMonthlyBudget = updateMonthlyOutflowBudget(
      updatedMonthlyBudgetBills,
      amount,
      outflowName
    );
    if (updatedMonthlyBudget) {
      return updatedMonthlyBudget;
    }
    return undefined;
  };

  const addBill = (
    id: string,
    amount: number,
    outflow: string,
    date: Date,
    description: string
  ) => {
    setStatus('loading');
    const updatedMonthlyBudget = updateMonthlyBudgetBill(
      id,
      amount,
      outflow,
      date,
      description
    );
    if (updatedMonthlyBudget) {
      try {
        const dataToUpdate = {
          bills: updatedMonthlyBudget.bills,
          cashflow: {
            outflow: {
              flows: updatedMonthlyBudget.cashflow.outflow.flows,
              totalFlow: updatedMonthlyBudget.cashflow.outflow.totalFlow,
            },
          },
          expenses: updatedMonthlyBudget.expenses,
        };
        patchMonthlyBudget(updatedMonthlyBudget.id, dataToUpdate);
      } catch (error) {
        console.error(error);
        setStatus('success');
      }
      setMonthlyBudget(updatedMonthlyBudget);
    }
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

  const renderNewBillForm = () => (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <Label htmlFor='outflow'>Outflow:</Label>
        <Select
          name='outflow'
          onValueChange={(value) => handleChangeOutflow(value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Choose an outflow...' />
          </SelectTrigger>
          <SelectContent>
            {outflows
              ? outflows.map((value, index) => {
                  if (value.name) {
                    return (
                      <SelectItem key={index} value={value.name}>
                        {value.name}
                      </SelectItem>
                    );
                  } else {
                    return <div key={index}></div>;
                  }
                })
              : ''}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='amount'>Amount:</Label>
        <Input
          name='amount'
          placeholder='0'
          value={amount}
          onChange={handleChangeAmount}
        />
      </div>
      <div>
        <Label htmlFor='description'>Description:</Label>
        <Textarea
          name='description'
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor='date'>Date:</Label>
        <DatePicker date={date} setDate={handleChangeDate} />
      </div>
      <ButtonWithLoading type='submit' className='w-full' loading={status}>
        Add
      </ButtonWithLoading>
    </form>
  );

  return (
    <div className=''>
      <Heading variant='title'>Add new bill</Heading>
      <div className='flex justify-between items-center mb-2'>
        <Dialog
          open={isAvailableOutflowsOpen}
          onOpenChange={() =>
            setIsAvailableOutflowsOpen(!isAvailableOutflowsOpen)
          }
        >
          <DialogTrigger
            onClick={() => setIsAvailableOutflowsOpen(true)}
            asChild
          >
            <Button variant={'secondary'}>See Month recap</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Month Outflows Recap</DialogTitle>
              <DialogDescription>
                Here is the list of the month outflows until today:
              </DialogDescription>
              {outflows.map((outflow) => {
                const allocated = outflow.quantity;
                const used = outflow?.expenses || 0;
                const remainnig = outflow.quantity - (outflow?.expenses || 0);
                return (
                  <div
                    key={outflow.name}
                    className='border rounded-md grid grid-cols-2 justify-around items-center p-1'
                  >
                    <div className='flex gap-2'>
                      <HandCoins className='text-blue-400' /> {outflow.name}
                    </div>
                    <div className='border-l-2 pl-2'>
                      <div className='flex gap-2'>
                        <p className='text-gray-300 mb-1'>Allocated budget:</p>
                        <p className='text-yellow-300'>
                          {currencyFormat(Number(allocated))}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-gray-300'>Budget used:</p>
                        <p className={'text-orange-300'}>
                          {currencyFormat(Number(used))}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-gray-300'>Remaining budget:</p>
                        <p
                          className={`${
                            remainnig <= 0 ? 'text-red-300' : 'text-green-300'
                          }`}
                        >
                          {currencyFormat(Number(remainnig))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div>
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
      </div>
      {renderNewBillForm()}
    </div>
  );
};

export default AddBill;
