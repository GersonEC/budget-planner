import { Link } from '@tanstack/react-router';
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
              <td>${bill.amount}</td>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>{bill.description}</td>
              <td>
                <Button onClick={() => removeBill(bill.id)}>X</Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={4} className='text-center pt-5'>
            <Button variant='link'>
              <Link to='/add-bill'>Add new</Link>
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BillsTable;
