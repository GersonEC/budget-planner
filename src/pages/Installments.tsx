import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Heading } from '../components/Heading';
import { InstallmentList } from '../components/InstallmentList';
import { InstallmentForm } from '../components/InstallmentForm';
import { usePersonalFinance } from '../context/PersonalFinanceContext';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { currencyFormat } from '../lib/utils';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';

export const Installments = () => {
  const { toast } = useToast();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const { finances, setFinances } = usePersonalFinance();
  const installments: Installment[] =
    finances.installmentList.installments ?? [];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateMonthlyBudgetOutflow = (
    type: 'add' | 'remove',
    installmentCost: number
  ) => {
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        outflow: {
          ...monthlyBudget.cashflow.outflow,
          totalFlow:
            type === 'add'
              ? monthlyBudget.cashflow.outflow.totalFlow + installmentCost
              : monthlyBudget.cashflow.outflow.totalFlow - installmentCost,
        },
        netflow:
          type === 'add'
            ? monthlyBudget.cashflow.inflow.totalFlow -
              (monthlyBudget.cashflow.outflow.totalFlow + installmentCost)
            : monthlyBudget.cashflow.inflow.totalFlow -
              (monthlyBudget.cashflow.outflow.totalFlow - installmentCost),
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  const handleRemove = (name: string) => {
    const newInstallments = installments.filter((i) => i.name !== name);
    const installment = installments.find((i) => i.name === name);
    const newFinances: PersonalFinance = {
      ...finances,
      installmentList: {
        installments: newInstallments,
        monthlyTotal: newInstallments.reduce(
          (prevValue, currValue) => prevValue + currValue.monthlyCost,
          0
        ),
      },
    };
    setFinances(newFinances);
    if (installment)
      updateMonthlyBudgetOutflow('remove', installment.monthlyCost);
    toast({
      variant: 'success',
      title: 'Installment removed successfully',
      description: `Installment: ${name}`,
    });
  };

  const addInstallment = (newInstallment: Installment) => {
    const newInstallments = [...installments, newInstallment];
    const newFinances: PersonalFinance = {
      ...finances,
      installmentList: {
        installments: newInstallments,
        monthlyTotal: newInstallments.reduce(
          (prevValue, currValue) => prevValue + currValue.monthlyCost,
          0
        ),
      },
    };
    setFinances(newFinances);
    updateMonthlyBudgetOutflow('add', newInstallment.monthlyCost);
    setIsOpen(false);
    toast({
      variant: 'success',
      title: 'Installment added successfully',
      description: `Installment: ${newInstallment.name} - ${currencyFormat(
        newInstallment.monthlyCost
      )}`,
    });
  };

  return (
    <div>
      <div className='flex justify-between'>
        <Heading variant='title'>Installments</Heading>
        <Button variant={'secondary'} onClick={() => setIsOpen(true)}>
          Add new installment
        </Button>
      </div>

      {/**TODO: Move subscription dialog into a separate component */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Installment</DialogTitle>
            <DialogDescription>
              insert the data about your new installment.
            </DialogDescription>
            <InstallmentForm addInstallment={addInstallment} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <InstallmentList
        installments={installments ?? []}
        removeInstallment={handleRemove}
      />
    </div>
  );
};
