import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

interface Props {
  loans: Loan[];
  removeLoan: (borrower: string) => void;
}
export const LoanList: React.FC<Props> = ({ loans, removeLoan }) => {
  return (
    <ul className=''>
      {loans.map((loan) => (
        <li
          className='flex justify-around items-center mb-4'
          key={loan.borrower}
        >
          <p className=' text-indigo-300'>{loan.borrower}</p>
          <div className='flex gap-4'>
            <div>
              <p className=' text-xs border-b-2'>Quantity</p>
              <p>{currencyFormat(loan.quantity)}</p>
            </div>
            <div>
              <p className=' text-xs border-b-2'>Dividends</p>
              <p>{currencyFormat(loan.dividend)}</p>
            </div>
          </div>
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeLoan(loan.borrower)}
          >
            ⛔️
          </Button>
        </li>
      ))}
    </ul>
  );
};
