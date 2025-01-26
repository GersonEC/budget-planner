import { useState } from 'react';
import { AddOutflowForm } from '../components/AddOutflowForm';
import { OutflowList } from '../components/OutflowList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Heading } from '../components/Heading';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { updateOutflows } from '../lib/utils';

export const Outflows = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const outflows = monthlyBudget.cashflow.outflow.flows;

  const removeOutflow = (outflowName: string) => {
    const newOutflows = outflows.filter((c) => c.name !== outflowName);
    const updatedOutflows = updateOutflows(monthlyBudget, newOutflows);
    setMonthlyBudget(updatedOutflows);
    toast({
      variant: 'success',
      title: 'Outflow removed successfully',
    });
  };

  const addOutflow = (outflow: Flow) => {
    const newOutflows = [...outflows, outflow];
    const updatedOutflows = updateOutflows(monthlyBudget, newOutflows);
    setMonthlyBudget(updatedOutflows);
    setIsOpen(false);
  };

  return (
    <div>
      <Heading variant='title'>Categories</Heading>
      <div className='flex justify-center mb-4'>
        <Button variant='outline' onClick={() => setIsOpen(true)}>
          Add new outflow
        </Button>
      </div>
      {/**TODO: Move subscription dialog into a separate component */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Outflow</DialogTitle>
            <DialogDescription>
              insert the data about your new outflow.
            </DialogDescription>
            <AddOutflowForm addOutflow={addOutflow} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <OutflowList outflows={outflows} removeOutflow={removeOutflow} />
      {/* <CategoriesPieChart /> */}
    </div>
  );
};
