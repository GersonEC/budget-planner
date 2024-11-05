import { FlowList } from '../components/FlowList';
import { Nav } from '../components/Nav';
import { Heading } from '../components/Heading';

export const CashFlow = () => {
  return (
    <div>
      <Nav />
      <Heading variant='title'>Cashflow</Heading>
      <Heading variant='subtitle'>Inflow</Heading>
      <FlowList type='inflow' />
      <Heading variant='subtitle'>Outflow</Heading>
      <FlowList type='outflow' />
    </div>
  );
};
