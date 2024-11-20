import { Link } from '@tanstack/react-router';
import { CashflowBarChart } from '../components/CashflowBarChart';
import { Heading } from '../components/Heading';
import { CategoriesPieChart } from '../components/CategoriesPieChart';
import { BillsBarChart } from '../components/BillsBarChart';
import { SubscriptionsPieChart } from '../components/SubscriptionsPieChart';
import { InstallmentsPieChart } from '../components/InstallmentsPieChart';
import { LoansBarChart } from '../components/LoansBarChart';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Heading variant='title'>Dashboard</Heading>
      <section className='flex flex-wrap justify-evenly'>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/bills'>
              Bills
            </Link>
          </Heading>
          <BillsBarChart />
        </div>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/categories'>
              Categories
            </Link>
          </Heading>
          <CategoriesPieChart />
        </div>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/cashflow'>
              Cashflow
            </Link>
          </Heading>
          <CashflowBarChart />
        </div>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/subscriptions'>
              Subscriptions
            </Link>
          </Heading>
          <SubscriptionsPieChart />
        </div>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/installments'>
              Installments
            </Link>
          </Heading>
          <InstallmentsPieChart />
        </div>
        <div>
          <Heading variant='subtitle'>
            <Link className='hover:underline' to='/loans'>
              Loans
            </Link>
          </Heading>
          <LoansBarChart />
        </div>
      </section>
    </div>
  );
};
