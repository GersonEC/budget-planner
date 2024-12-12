import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

type Props = {
  bills: Bill[];
  removeBill: (id: string) => void;
};

const BillsTable: React.FC<Props> = ({ bills, removeBill }) => {
  const renderBillCard = (bill: Bill) => {
    return (
      <div className='border p-2 shadow-md'>
        <div className='flex justify-between items-baseline'>
          <p className='border rounded border-indigo-200 bg-zinc-800 text-center text-indigo-200 px-6 text-sm brightness-150'>
            {bill.category}
          </p>
          <Button
            className='px-2 text-red-400'
            variant={'link'}
            onClick={() => removeBill(bill.id)}
          >
            Remove
          </Button>
        </div>

        <div className='flex justify-between items-center'>
          <p className=' p-1 text-balance'>{bill.description}</p>
          <div>
            <p className='font-bold my-2 text-end text-xl'>
              {currencyFormat(bill.amount)}
            </p>
            <p className='italic text-gray-400 text-sm'>
              {new Date(bill.date).toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (bills.length === 0) {
    return (
      <p className='text-center text-gray-300'>There are no bill to show</p>
    );
  }

  return (
    <div>
      {bills.map((bill) => {
        return <div key={bill.id}>{renderBillCard(bill)}</div>;
      })}
    </div>
  );
};

export default BillsTable;
