import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { initialFlowListValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { toCapitalize } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { Label } from './ui/label';

interface Props {
  type: 'inflow' | 'outflow';
  handleSubmit: (flowList: FlowList) => void;
}

const calculateTotalFlow = (flows: Flow[]) => {
  return flows.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );
};

export const FlowForm: React.FC<Props> = ({ type, handleSubmit }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [flowList, setFlowList] = useState<FlowList>(initialFlowListValue);
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (e: any) => {
    e.preventDefault();
    const inflow: Flow = {
      type,
      name,
      quantity: Number(quantity),
    };
    const newFlowList: FlowList = {
      flows: [...flowList.flows, inflow],
      totalFlow: calculateTotalFlow([...flowList.flows, inflow]),
    };
    setFlowList(newFlowList);
    setName('');
    setQuantity(0);
    toast({
      variant: 'success',
      title: `${toCapitalize(type)} element added`,
    });
    //handleSubmit(type, newFlowList);
    handleSubmit(newFlowList);
    let updatedMonthlyBudget: MonthlyBudget;
    if (type === 'inflow') {
      updatedMonthlyBudget = {
        ...monthlyBudget,
        cashflow: {
          ...monthlyBudget.cashflow,
          inflow: newFlowList,
        },
      };
      setMonthlyBudget(updatedMonthlyBudget);
    } else if (type === 'outflow') {
      updatedMonthlyBudget = {
        ...monthlyBudget,
        cashflow: {
          ...monthlyBudget.cashflow,
          outflow: newFlowList,
        },
      };
      setMonthlyBudget(updatedMonthlyBudget);
    }
  };

  // const removeFlow = (name: string) => {
  //   const newFlows = flowList.flows.filter((f) => f.name !== name);
  //   const newFlowList: FlowList = {
  //     flows: newFlows,
  //     totalFlow: calculateTotalFlow(newFlows),
  //   };
  //   setFlowList(newFlowList);
  //   localStorage.setItem(type, JSON.stringify(newFlows));
  // };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-2 my-4'>
          <Label htmlFor='email'>
            {type.charAt(0).toUpperCase().concat(type.slice(1))} name
          </Label>
          <Input
            name={`${type}-name`}
            placeholder={`${type === 'inflow' ? 'Salary' : 'Experiences'}`}
            value={name}
            min={0}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <Button variant={'secondary'}>Add</Button>
        </div>
      </form>
      {/* TODO: is it useful to show the flow list? */}
      {/* <ul>
        {flowList.flows.map((flow) => (
          <li key={flow.name}>
            {flow.name}: {flow.quantity}
            <Button
              name='remove'
              variant='ghost'
              size='icon'
              onClick={() => removeFlow(flow.name)}
            >
              ⛔️
            </Button>
          </li>
        ))}
      </ul> */}
    </>
  );
};
