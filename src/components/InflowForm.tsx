import { HandCoins, Trash2 } from 'lucide-react';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { FlowForm } from './FlowForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { currencyFormat } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

export const InflowForm = () => {
  const { toast } = useToast();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const inflows = monthlyBudget.cashflow.inflow.flows;
  const [isInflowDialogOpen, setIsInflowDialogOpen] = useState<boolean>(false);

  const handleAddFlow = (flowList: InflowList) => {
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        inflow: flowList,
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  const handleRemoveFlow = (flow: Inflow) => {
    const newFlows = monthlyBudget.cashflow.inflow.flows.filter(
      (f) => f.name !== flow.name
    );
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        inflow: {
          flows: newFlows,
          totalFlow: monthlyBudget.cashflow.inflow.totalFlow - flow.quantity,
        },
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
    toast({
      variant: 'success',
      title: 'Inflow removed correctly',
    });
  };

  const renderShowInflows = () => {
    return (
      <Dialog
        open={isInflowDialogOpen}
        onOpenChange={() => setIsInflowDialogOpen(!isInflowDialogOpen)}
      >
        <DialogTrigger
          className='hover:underline text-orange-400 text-sm pb-4'
          onClick={() => setIsInflowDialogOpen(true)}
        >
          check your inflows
        </DialogTrigger>
        <DialogContent
          className='min-h-max h-1/4 w-11/12'
          aria-describedby='inflow list'
        >
          <DialogHeader>
            <DialogTitle>Inflows</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center pt-4'>
              {inflows.length === 0 ? (
                <div className='flex flex-1 items-center justify-center mt-8'>
                  There are no inflows to show.
                </div>
              ) : (
                inflows.map((inflow) => (
                  <div
                    key={inflow.name}
                    className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'
                  >
                    <HandCoins className='text-green-400' />
                    {inflow.name}: {currencyFormat(inflow.quantity)}
                    <Trash2
                      className='w-5 text-slate-400 hover:text-red-400'
                      onClick={() => handleRemoveFlow(inflow)}
                    />
                  </div>
                ))
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className=' border-b-2'>
      <div className='flex flex-col'>
        <FlowForm type='inflow' handleAddFlow={handleAddFlow} />
        {inflows.length > 0 && renderShowInflows()}
      </div>
    </div>
  );
};
