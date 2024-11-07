import { FlowList } from '../components/FlowList';
import { Nav } from '../components/Nav';
import { Heading } from '../components/Heading';
import React from 'react';
import { currencyFormat } from '../lib/utils';

export const CashFlow = () => {
  const [netCashflow, setNetCashflow] = React.useState({
    inflow: 0,
    outflow: 0,
    netflow: 0,
  });

  React.useEffect(() => {
    const inflowInSessionStorage = sessionStorage.getItem('inflow');
    const outflowInSessionStorage = sessionStorage.getItem('outflow');
    if (inflowInSessionStorage && outflowInSessionStorage) {
      const inflow = JSON.parse(inflowInSessionStorage) as FlowList;
      const outflow = JSON.parse(outflowInSessionStorage) as FlowList;
      setNetCashflow({
        inflow: inflow.totalFlow,
        outflow: outflow.totalFlow,
        netflow: inflow.totalFlow - outflow.totalFlow,
      });
    }
  }, []);

  return (
    <div>
      <Nav />
      <Heading variant='title'>Cashflow</Heading>
      <Heading variant='subtitle'>Inflow</Heading>
      <FlowList type='inflow' />
      <Heading variant='subtitle'>Outflow</Heading>
      <FlowList type='outflow' />
      <Heading variant='subtitle'>Net flow</Heading>
      <p>
        <span className=' font-semibold text-green-300'>
          {currencyFormat(netCashflow.inflow)}
        </span>{' '}
        -{' '}
        <span className=' font-semibold text-red-300'>
          {' '}
          {currencyFormat(netCashflow.outflow)}
        </span>{' '}
        ={' '}
        <span className=' font-semibold text-blue-400'>
          {currencyFormat(netCashflow.netflow)}
        </span>
      </p>
    </div>
  );
};
