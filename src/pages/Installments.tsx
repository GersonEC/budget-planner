import { useState } from 'react';
import { Nav } from '../components/Nav';
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

export const Installments = () => {
  const { toast } = useToast();
  const { finances, setFinances } = usePersonalFinance();
  const installments: Installment[] =
    finances.installmentList.installments ?? [];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRemove = (name: string) => {
    const newInstallments = installments.filter((i) => i.name !== name);
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
      <Nav />
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
