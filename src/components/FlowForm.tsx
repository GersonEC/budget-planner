import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { initialFlowListValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { toCapitalize } from '../lib/utils';
import { Label } from './ui/label';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useCategories } from '../context/CategoriesContext';

interface Props {
  type: 'inflow' | 'outflow';
  handleAddFlow: (flowList: FlowList) => void;
}

const calculateTotalFlow = (flows: Flow[]) => {
  return flows.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );
};

export const FlowForm: React.FC<Props> = ({ type, handleAddFlow }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [, setFlowList] = useState<FlowList>(initialFlowListValue);
  const { monthlyBudget } = useMonthlyBudget();
  const { categories, setCategories } = useCategories();

  const reset = () => {
    setFlowList(initialFlowListValue);
    setName('');
    setQuantity('');
  };

  const addCategory = (name: string, budget: number) => {
    const category: CategoryForm = {
      name,
      budget,
      expenses: 0,
    };
    const newCategories = [...categories, category];
    setCategories(newCategories);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAdd = (e: any) => {
    e.preventDefault();
    const flow: Flow = {
      type,
      name,
      quantity: Number(quantity),
    };
    const newFlowList: FlowList = {
      flows: [...monthlyBudget.cashflow[type].flows, flow],
      totalFlow: calculateTotalFlow([
        ...monthlyBudget.cashflow[type].flows,
        flow,
      ]),
    };
    if (type === 'outflow') {
      addCategory(flow.name, flow.quantity);
    }
    reset();
    toast({
      variant: 'success',
      title: `${toCapitalize(type)} element added`,
    });
    handleAddFlow(newFlowList);
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
      <Button variant={'secondary'} onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};
