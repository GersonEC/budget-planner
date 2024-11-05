import { useEffect, useState } from 'react';
import { currencyFormat } from '../lib/utils';

interface Props {
  type: 'inflow' | 'outflow';
}

const initialFlowListValue: FlowList = {
  flows: [],
  totalFlow: 0,
};

export const FlowList: React.FC<Props> = ({ type }) => {
  const [flowList, setFlowList] = useState<FlowList>(initialFlowListValue);

  useEffect(() => {
    const flowsInSessionStorage = sessionStorage.getItem(type);
    if (flowsInSessionStorage) setFlowList(JSON.parse(flowsInSessionStorage));
  }, [type]);

  return (
    <ul>
      {flowList.flows.map((flow) => (
        <li key={flow.name}>
          {flow.name} - {currencyFormat(flow.quantity)}
        </li>
      ))}
      Total {type} = {currencyFormat(flowList.totalFlow)}
    </ul>
  );
};
