import { useEffect, useState } from 'react';

interface Props {
  type: 'inflow' | 'outflow';
}

export const FlowList: React.FC<Props> = ({ type }) => {
  const [flows, setFlows] = useState<Flow[]>([]);

  useEffect(() => {
    const flowsInSessionStorage = sessionStorage.getItem(type);
    if (flowsInSessionStorage) setFlows(JSON.parse(flowsInSessionStorage));
  }, [type]);

  return (
    <ul>
      {flows.map((flow) => (
        <li key={flow.name}>
          {flow.name} - {flow.quantity}
        </li>
      ))}
    </ul>
  );
};
