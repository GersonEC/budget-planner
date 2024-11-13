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
import { LoanForm } from '../components/LoanForm';
import { LoanList } from '../components/LoanList';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

export const Loans = () => {
  const { finances, setFinances } = usePersonalFinance();
  const loans: Loan[] = finances.loanList.loans;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRemove = (borrower: string) => {
    const newLoans = loans.filter((l) => l.borrower !== borrower);
    const newFinances: PersonalFinance = {
      ...finances,
      loanList: {
        loans: newLoans,
        monthlyTotal: newLoans.reduce((prev, curr) => prev + curr.quantity, 0),
      },
    };
    setFinances(newFinances);
  };

  const handleAddLoan = (newLoan: Loan) => {
    const newLoans = [...loans, newLoan];
    const newFinances: PersonalFinance = {
      ...finances,
      loanList: {
        loans: newLoans,
        monthlyTotal: newLoans.reduce((prev, curr) => prev + curr.quantity, 0),
      },
    };
    setFinances(newFinances);
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
