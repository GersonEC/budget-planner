import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Props {
  type: 'inflow' | 'outflow';
}

const calculateTotalFlow = (flows: Flow[]) => {
  return flows.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );
};

const initialFlowListValue: FlowList = {
  flows: [],
  totalFlow: 0,
};

export const FlowForm: React.FC<Props> = ({ type }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [flowList, setFlowList] = useState<FlowList>(initialFlowListValue);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
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
    sessionStorage.setItem(type, JSON.stringify(newFlowList));
  };

  const removeFlow = (name: string) => {
    const newFlows = flowList.flows.filter((f) => f.name !== name);
    const newFlowList: FlowList = {
      flows: newFlows,
      totalFlow: calculateTotalFlow(newFlows),
    };
    setFlowList(newFlowList);
    sessionStorage.setItem(type, JSON.stringify(newFlows));
  };

  return (
    <>
      <form className='flex' onSubmit={handleSubmit}>
        <Input
          name={`${type}-name`}
          placeholder={`${type} name...`}
          value={name}
          min={0}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type='number'
          name={`${type}-quantity`}
          value={quantity}
          min={0}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <Button variant={'outline'}>Add</Button>
      </form>
      <ul>
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
      </ul>
    </>
  );
};