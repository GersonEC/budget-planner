import { FlowList } from './FlowList';

export const CashFlow = () => {
  return (
    <div>
      <h1>Cashflow</h1>
      <h2>Inflow</h2>
      <FlowList type='inflow' />
      <h2>OutFlow</h2>
      <FlowList type='outflow' />
    </div>
  );
};
