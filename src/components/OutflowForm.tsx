import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { FlowForm } from './FlowForm';
import { HandCoins, Trash2 } from 'lucide-react';
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

export const OutflowForm = () => {
  const { toast } = useToast();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const [isOutflowDialogOpen, setIsOutflowDialogOpen] =
    useState<boolean>(false);
  const outflows = monthlyBudget.cashflow.outflow.flows;

  const handleAddFlow = (flowList: FlowList) => {
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        outflow: flowList,
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  const handleRemoveFlow = (flow: Flow) => {
    const newFlows = monthlyBudget.cashflow.outflow.flows.filter(
      (f) => f.name !== flow.name
    );
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        outflow: {
          flows: newFlows,
          totalFlow: monthlyBudget.cashflow.outflow.totalFlow - flow.quantity,
        },
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
    toast({
      variant: 'success',
      title: 'Outflow removed correctly',
    });
  };

  const renderShowOutflows = () => {
    return (
      <Dialog
        open={isOutflowDialogOpen}
        onOpenChange={() => setIsOutflowDialogOpen(!isOutflowDialogOpen)}
      >
        <DialogTrigger
          className='hover:underline text-orange-400 text-sm  pb-4'
          onClick={() => setIsOutflowDialogOpen(true)}
        >
          check your outflows
        </DialogTrigger>
        <DialogContent
          className='min-h-max h-1/4 w-11/12'
          aria-describedby='outflow list'
        >
          <DialogHeader>
            <DialogTitle>Outflows</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center'>
              {outflows.length === 0 ? (
                <div className='flex flex-1 items-center justify-center mt-8'>
                  There are no outflows to show.
                </div>
              ) : (
                outflows.map((outflow) => (
                  <div
                    key={outflow.name}
                    className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2 mt-4'
                  >
                    <HandCoins className='text-red-400' />
                    {outflow.name}: {currencyFormat(outflow.quantity)}
                    <Trash2
                      className='w-5 text-slate-400 hover:text-red-400'
                      onClick={() => handleRemoveFlow(outflow)}
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
    <div className='border-b-2'>
      <div className='flex flex-col'>
        <FlowForm type='outflow' handleAddFlow={handleAddFlow} />
        {outflows.length > 0 && renderShowOutflows()}
      </div>
    </div>
  );
};
