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
import { LoanForm } from '../components/LoanForm';
import { LoanList } from '../components/LoanList';

export const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const loansInSessionStorage = sessionStorage.getItem('loans');
    if (loansInSessionStorage) {
      setLoans(JSON.parse(loansInSessionStorage));
    }
  }, []);

  const handleRemove = (borrower: string) => {
    const newLoans = loans.filter((l) => l.borrower !== borrower);
    setLoans(newLoans);
    sessionStorage.setItem('loans', JSON.stringify(newLoans));
  };

  const handleAddLoan = (newLoan: Loan) => {
    const newLoans = [...loans, newLoan];
    setLoans(newLoans);
    sessionStorage.setItem('loans', JSON.stringify(newLoans));
    setIsOpen(false);
  };

  return (
    <div>
      <Nav />
      <Heading variant='title'>Loans</Heading>
      <Dialog open={isOpen}>
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsOpen(true)}
        >
          Add new loans
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Loan</DialogTitle>
            <DialogDescription>
              insert the data about your new loan
            </DialogDescription>
            <LoanForm addLoan={handleAddLoan} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <LoanList loans={loans} removeLoan={handleRemove} />
    </div>
  );
};