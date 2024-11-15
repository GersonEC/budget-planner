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
import { LoanForm } from '../components/LoanForm';
import { LoanList } from '../components/LoanList';
import { usePersonalFinance } from '../context/PersonalFinanceContext';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { currencyFormat } from '../lib/utils';

export const Loans = () => {
  const { toast } = useToast();
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
    toast({
      variant: 'success',
      title: 'Loan removed successfully',
      description: `Loan: ${borrower}`,
    });
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
    toast({
      variant: 'success',
      title: 'Loan added successfully',
      description: `Loan: ${newLoan.borrower} - ${currencyFormat(
        newLoan.quantity
      )}`,
    });
  };

  return (
    <div>
      <Nav />
      <div className='flex justify-between items-baseline'>
        <Heading variant='title'>Loans</Heading>
        <Button variant={'secondary'} onClick={() => setIsOpen(true)}>
          Add new loan
        </Button>
      </div>
      {/**TODO: Move subscription dialog into a separate component */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
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
