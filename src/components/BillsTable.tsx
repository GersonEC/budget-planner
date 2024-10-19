import { Link } from '@tanstack/react-router';

type Props = {
  bills: Bill[];
  removeBill: (id: string) => void;
};

const BillsTable: React.FC<Props> = ({ bills, removeBill }) => {
  return (
    <table className='table w-full'>
      <thead className='text-left'>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Amount</th>
          <th scope='col'>Category</th>
          <th scope='col' />
        </tr>
      </thead>
      <tbody>
        {bills?.map((bill) => {
          return (
            <tr className='p4' key={bill.id}>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>${bill.amount}</td>
              <td>{bill.category}</td>
              <td>
                <button onClick={() => removeBill(bill.id)}>X</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={4} className='text-center pt-5'>
            <button className='underline'>
              <Link to='/add-bill'>Add new</Link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BillsTable;
