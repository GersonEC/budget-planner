import { Trash2 } from 'lucide-react';
import { currencyFormat } from '../lib/utils';

type Props = {
  bills: Bill[];
  removeBill: (id: string) => void;
};

const BillsCardList: React.FC<Props> = ({ bills, removeBill }) => {
  const renderBillCard = (bill: Bill) => {
    return (
      <div className='border p-2 shadow-md rounded border-slate-200'>
        <div className='flex justify-between items-baseline'>
          <p className='border rounded border-indigo-200 bg-zinc-800 text-center text-indigo-200 px-6 text-sm brightness-150'>
            {bill.category}
          </p>
          <Trash2
            aria-label='delete'
            className=' w-5 text-slate-400 hover:text-red-400'
            onClick={() => removeBill(bill.id)}
          />
        </div>

        <div className='flex justify-between items-center'>
          <p className=' p-1 text-balance text-sm'>{bill.description}</p>
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
      <p className='text-center text-gray-300 p-2'>
        There are no bills to show
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {bills.map((bill) => {
        return <div key={bill.id}>{renderBillCard(bill)}</div>;
      })}
    </div>
  );
};

export default BillsCardList;
