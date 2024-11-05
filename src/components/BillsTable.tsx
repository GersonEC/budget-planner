import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

type Props = {
  bills: Bill[];
  removeBill: (id: string) => void;
};

const BillsTable: React.FC<Props> = ({ bills, removeBill }) => {
  return (
    <table className='table w-full'>
      <thead className='text-left'>
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
            <tr className='p4' key={bill.id}>
              <td>{bill.category}</td>
              <td>{currencyFormat(bill.amount)}</td>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>{bill.description}</td>
              <td>
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
