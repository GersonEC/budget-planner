import { Banknote, Trash2 } from 'lucide-react';
import { currencyFormat } from '../lib/utils';
import { ConfirmDialog } from './ConfirmDialog';

interface Props {
  outflows: Flow[];
  removeOutflow: (outflowName: string) => void;
}
export const OutflowList: React.FC<Props> = ({ outflows, removeOutflow }) => {
  return (
    <ul className='flex items-center justify-center py-4 gap-4 flex-wrap'>
      {outflows.map((outflow) => (
        <li
          key={outflow.name}
          className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'
        >
          <Banknote className='text-blue-400' />
          {outflow.name}: {currencyFormat(Number(outflow.quantity))}
          <ConfirmDialog
            action={() => removeOutflow(outflow.name)}
            trigger={
              <Trash2
                aria-label='delete'
                className='w-5 text-slate-400 hover:text-red-400'
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};