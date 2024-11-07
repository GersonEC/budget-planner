import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

interface Props {
  loans: Loan[];
  removeLoan: (borrower: string) => void;
}
export const LoanList: React.FC<Props> = ({ loans, removeLoan }) => {
  return (
    <ul className='flex  flex-col '>
      {loans.map((loan) => (
        <li className='flex-col items-center' key={loan.borrower}>
          <span className=' text-indigo-300'>
            {loan.borrower}
            {': '}
          </span>

          <span>{currencyFormat(loan.quantity)}</span>
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeLoan(loan.borrower)}
          >
            ⛔️
          </Button>
          <p>Dividends: {currencyFormat(loan.dividend)}</p>
        </li>
      ))}
    </ul>
  );
};
