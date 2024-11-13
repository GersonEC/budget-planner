import { useState } from 'react';
import { Nav } from '../components/Nav';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Heading } from '../components/Heading';
import { InstallmentList } from '../components/InstallmentList';
import { InstallmentForm } from '../components/InstallmentForm';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

export const Installments = () => {
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
  };

  return (
    <div>
      <Nav />
      <Heading variant='title'>Installments</Heading>
      <Dialog open={isOpen}>
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsOpen(true)}
        >
          Add new installment
        </DialogTrigger>
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
