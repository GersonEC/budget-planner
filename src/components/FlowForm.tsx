import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { initialFlowListValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { calculateTotalFlow, toCapitalize } from '../lib/utils';
import { Label } from './ui/label';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

type Props = {
  type: 'inflow' | 'outflow';
  handleAddFlow: (flowList: FlowList) => void;
};

export const FlowForm: React.FC<Props> = ({ type, handleAddFlow }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [, setFlowList] = useState<FlowList>(initialFlowListValue);
  const { monthlyBudget } = useMonthlyBudget();
  // const { categories, setCategories } = useCategories();

  const reset = () => {
    setFlowList(initialFlowListValue);
    setName('');
    setQuantity('');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddOutflow = (e: any) => {
    e.preventDefault();
    const flow: Flow = {
      type: 'outflow',
      name,
      quantity: Number(quantity),
      expenses: 0,
    };
    const newFlowList: FlowList = {
      flows: [...monthlyBudget.cashflow.outflow.flows, flow],
      totalFlow: calculateTotalFlow([
        ...monthlyBudget.cashflow.outflow.flows,
        flow,
      ]),
    };
    reset();
    toast({
      variant: 'success',
      title: `${toCapitalize(type)} element added`,
    });
    handleAddFlow(newFlowList);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddInflow = (e: any) => {
    if (type === 'inflow') {
      e.preventDefault();
      const flow: Flow = {
        type: 'inflow',
        name,
        quantity: Number(quantity),
      };
      const newFlowList: FlowList = {
        flows: [...monthlyBudget.cashflow.inflow.flows, flow],
        totalFlow: calculateTotalFlow([
          ...monthlyBudget.cashflow.inflow.flows,
          flow,
        ]),
      };
      reset();
      toast({
        variant: 'success',
        title: `${toCapitalize(type)} element added`,
      });
      handleAddFlow(newFlowList);
    }
  };

  return (
    <div className='flex flex-col gap-4 my-4'>
      <div>
        <Label htmlFor={`${type}-name`}>{toCapitalize(type)} name</Label>
        <Input
          name={`${type}-name`}
          placeholder={`${type === 'inflow' ? 'Salary' : 'Experiences'}`}
          value={name}
          min={0}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='email'>Quantity</Label>
        <Input
          type='number'
          name={`${type}-quantity`}
          value={quantity}
          placeholder='0'
          min={0}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <Button
        variant={'secondary'}
        onClick={type === 'inflow' ? handleAddInflow : handleAddOutflow}
      >
        Add
      </Button>
    </div>
  );
};
