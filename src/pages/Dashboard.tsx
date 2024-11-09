import { CashflowBarChart } from '../components/CashflowBarChart';
import { Heading } from '../components/Heading';
import { Nav } from '../components/Nav';
import { PieChart, PieChartData } from '../components/PieChart';
import { useCategories } from '../context/CategoriesContext';
import { createPieChartDataFromCategory } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { categories } = useCategories();

  const categoryPieChart: PieChartData[] = categories.map((cat) =>
    createPieChartDataFromCategory(cat)
  );

  return (
    <div>
      <Nav />
      <Heading variant='title'>Dashboard</Heading>
      <div>
        <Heading variant='subtitle'>Categories</Heading>
        <PieChart data={categoryPieChart} />
      </div>
      <div>
        <Heading variant='subtitle'>Cashflow</Heading>
        <CashflowBarChart />
      </div>
      <Heading variant='subtitle'>Subscriptions</Heading>
      <Heading variant='subtitle'>Installments</Heading>
      <Heading variant='subtitle'>Loans</Heading>
    </div>
  );
};
