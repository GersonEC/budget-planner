import { SquarePen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { updateOutflows } from '../lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { AddOutflowForm } from './AddOutflowForm';
import { OutflowList } from './OutflowList';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { patchMonthlyBudget } from '../api/patchMonthlyBudget';

interface Props {
  activeCategory: string;
  setNewActiveCategory: (category: string) => void;
}

export function OutflowNavBar(props: Props) {
  const { toast } = useToast();
  const [isOutflowListOpen, setIsOutflowListOpen] = useState(false);
  const [isNewOutflowOpen, setIsNewOutflowOpen] = useState(false);
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const outflows = monthlyBudget.cashflow.outflow.flows;
  const outflowsText = monthlyBudget.cashflow.outflow.flows.map((c) => c.name);

  const setNewActiveCategory = (category: string) => {
    props.setNewActiveCategory(category);
  };

  const removeOutflow = (outflowName: string) => {
    try {
      const newOutflows = outflows.filter((c) => c.name !== outflowName);
      const updatedOutflows = updateOutflows(monthlyBudget, newOutflows);
      const dataToUpdate = {
        cashflow: {
          outflow: {
            flows: updatedOutflows.cashflow.outflow.flows,
            totalFlow: updatedOutflows.cashflow.outflow.totalFlow,
          },
        },
      };
      patchMonthlyBudget(updatedOutflows.id, dataToUpdate);
      setMonthlyBudget(updatedOutflows);
      toast({
        variant: 'success',
        title: 'Outflow removed successfully',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addOutflow = (outflow: Flow) => {
    const newOutflows = [...outflows, outflow];
    const updatedOutflows = updateOutflows(monthlyBudget, newOutflows);
    setMonthlyBudget(updatedOutflows);
    setIsNewOutflowOpen(false);
  };

  const renderAddNewOutflow = () => {
    return (
      <Dialog
        open={isNewOutflowOpen}
        onOpenChange={() => setIsNewOutflowOpen(!isNewOutflowOpen)}
      >
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsNewOutflowOpen(true)}
          asChild
        >
          <Button variant='outline'>Add new outflow</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Outflow</DialogTitle>
            <DialogDescription>Insert your new outflow data:</DialogDescription>
            <AddOutflowForm addOutflow={addOutflow} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const renderOutflowList = () => {
    return (
      <Dialog
        open={isOutflowListOpen}
        onOpenChange={() => setIsOutflowListOpen(!isOutflowListOpen)}
      >
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsOutflowListOpen(true)}
        >
          <SquarePen className='w-4 text-yellow-200' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Current outflows</DialogTitle>
            <DialogDescription></DialogDescription>
            {renderAddNewOutflow()}
            <OutflowList outflows={outflows} removeOutflow={removeOutflow} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const liStyle = ' text-gray-200 text-gray-300 hover:cursor-pointer rounded';

  return (
    <ul className='list-reset flex flex-wrap justify-center items-center gap-2 bg-zinc-800 rounded mb-2 p-1'>
      <li
        className={
          liStyle +
          (props.activeCategory === '' || props.activeCategory === undefined
            ? ' bg-grey-dark'
            : ' bg-grey-lighter')
        }
        onClick={() => setNewActiveCategory('')}
      >
        All
      </li>
      {outflowsText
        ? outflowsText.map((value, index) => {
            return (
              <li
                className={`${liStyle} ${
                  props.activeCategory === value ? 'bg-zinc-600 px-1' : ''
                }`}
                key={index}
                onClick={() => setNewActiveCategory(value)}
              >
                {value}
              </li>
            );
          })
        : '<li>No categories</li>'}
      <li className='flex'>{renderOutflowList()}</li>
    </ul>
  );
}
