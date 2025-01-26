import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { initialOutflowValue } from '../lib/fakes';
import { useToast } from '../hooks/use-toast';
import { currencyFormat } from '../lib/utils';
import { Label } from './ui/label';

type Props = {
  addOutflow: (outflow: Flow) => void;
};

export const AddOutflowForm: React.FC<Props> = (props) => {
  const { toast } = useToast();
  const [outflowForm, setOutflowForm] = useState<Flow>(initialOutflowValue);

  const handleAddCategory = () => {
    const { name, quantity } = outflowForm;
    if (!name || !quantity) {
      alert('Please enter the outflow name and the quantity');
      return;
    }
    setOutflowForm(initialOutflowValue);
    props.addOutflow(outflowForm);
    toast({
      variant: 'success',
      title: 'Outflow added successfully',
      description: `New outflow: ${name} - ${currencyFormat(Number(quantity))}`,
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 mt-2'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            className='bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3'
            name='name'
            placeholder='Experiences...'
            value={outflowForm.name}
            onChange={(e) =>
              setOutflowForm({
                ...outflowForm,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor='quantity'>Quantity</Label>
          <Input
            className='bg-zinc-800 shadow appearance-none border rounded w-full py-2 px-3'
            name='quantity'
            type='number'
            value={outflowForm.quantity}
            onChange={(e) =>
              setOutflowForm({
                ...outflowForm,
                quantity: Number(e.target.value),
              })
            }
          />
        </div>
      </div>
      <Button className='w-full' onClick={handleAddCategory}>
        Add Outflow
      </Button>
    </div>
  );
};
