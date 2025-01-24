import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { initialFlowListValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { toCapitalize } from '../lib/utils';
import { Label } from './ui/label';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

type Props =
  | {
      type: 'inflow';
      handleAddFlow: (flowList: InflowList) => void;
    }
  | {
      type: 'outflow';
      handleAddFlow: (flowList: OutflowList) => void;
    };

const calculateTotalFlow = (flows: Inflow[] | Outflow[]) => {
  return flows.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );
};

export const FlowForm: React.FC<Props> = ({ type, handleAddFlow }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [, setFlowList] = useState<InflowList | OutflowList>(
    initialFlowListValue
  );
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
    const flow: Outflow = {
      name,
      quantity: Number(quantity),
      expenses: 0,
    };
    const newFlowList: OutflowList = {
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
      const flow: Inflow = {
        name,
        quantity: Number(quantity),
      };
      const newFlowList: InflowList = {
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
