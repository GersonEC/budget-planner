import { useEffect, useState } from 'react';
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

export const Installments = () => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const installmentsInSessionStorage = sessionStorage.getItem('installments');
    if (installmentsInSessionStorage) {
      setInstallments(JSON.parse(installmentsInSessionStorage));
    }
  }, []);

  const handleRemove = (name: string) => {
    const newInstallments = installments.filter((i) => i.name !== name);
    setInstallments(newInstallments);
    sessionStorage.setItem('installments', JSON.stringify(newInstallments));
  };

  const addInstallment = (newInstallment: Installment) => {
    const newInstallments = [...installments, newInstallment];
    setInstallments(newInstallments);
    sessionStorage.setItem('installments', JSON.stringify(newInstallments));
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
        installments={installments}
        removeInstallment={handleRemove}
      />
    </div>
  );
};
