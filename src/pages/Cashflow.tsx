import { FlowList } from '../components/FlowList';
import { Nav } from '../components/Nav';

export const CashFlow = () => {
  return (
    <div>
      <Nav />
      <h1>Cashflow</h1>
      <h2>Inflow</h2>
      <FlowList type='inflow' />
      <h2>OutFlow</h2>
      <FlowList type='outflow' />
    </div>
  );
};
