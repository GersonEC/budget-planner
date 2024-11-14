import { useEffect, useState } from 'react';
import { currencyFormat } from '../lib/utils';
import { initialFlowListValue } from '../lib/fakes';

interface Props {
  type: 'inflow' | 'outflow';
}

export const FlowList: React.FC<Props> = ({ type }) => {
  const [flowList, setFlowList] = useState<FlowList>(initialFlowListValue);

  useEffect(() => {
    const flowsInSessionStorage = localStorage.getItem(type);
    if (flowsInSessionStorage) setFlowList(JSON.parse(flowsInSessionStorage));
  }, [type]);

  return (
    <ul>
      {flowList.flows.map((flow) => (
        <li key={flow.name}>
          <span className=' text-indigo-300'>{flow.name}</span>:{' '}
          {currencyFormat(flow.quantity)}
        </li>
      ))}
      <p className='mt-2'>
        <span className=' text-indigo-200 font-bold'>Total {type}</span> ={' '}
        {currencyFormat(flowList.totalFlow)}
      </p>
    </ul>
  );
};
