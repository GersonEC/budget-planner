import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Props {
  type: 'inflow' | 'outflow';
}

export const FlowForm: React.FC<Props> = ({ type }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [flows, setFlows] = useState<Flow[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inflow: Flow = {
      type,
      name,
      quantity,
    };
    const newFlows = [...flows, inflow];
    setFlows(newFlows);
    setName('');
    setQuantity(0);
    sessionStorage.setItem(type, JSON.stringify(newFlows));
  };

  const removeFlow = (name: string) => {
    const newFlows = flows.filter((f) => f.name !== name);
    setFlows(newFlows);
    sessionStorage.setItem(type, JSON.stringify(newFlows));
  };

  return (
    <>
      <form className='flex' onSubmit={handleSubmit}>
        <Input
          name={`${type}-name`}
          placeholder={`${type} name...`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type='number'
          name={`${type}-quantity`}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <Button variant={'outline'}>Add</Button>
      </form>
      <ul>
        {flows.map((flow) => (
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
