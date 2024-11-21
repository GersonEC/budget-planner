import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

type Props = {
  bills: Bill[];
  removeBill: (id: string) => void;
};

const BillsTable: React.FC<Props> = ({ bills, removeBill }) => {
  return (
    <table className='table w-full'>
      <thead className='text-center'>
        <tr>
          <th scope='col'>Category</th>
          <th scope='col'>Amount</th>
          <th scope='col'>Date</th>
          <th scope='col'>Description</th>
          <th scope='col' />
        </tr>
      </thead>
      <tbody>
        {bills?.map((bill) => {
          return (
            <tr key={bill.id}>
              <td className=' p-1'>{bill.category}</td>
              <td className=' p-1'>{currencyFormat(bill.amount)}</td>
              <td className=' p-1'>
                {new Date(bill.date).toLocaleDateString('it-IT')}
              </td>
              <td className=' p-1 text-balance'>{bill.description}</td>
              <td className=' p-1'>
                <Button
                  className='px-2'
                  variant={'ghost'}
                  onClick={() => removeBill(bill.id)}
                >
                  ⛔️
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BillsTable;
