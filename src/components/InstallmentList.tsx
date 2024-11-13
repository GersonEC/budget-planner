import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

interface Props {
  installments: Installment[];
  removeInstallment: (name: string) => void;
}
export const InstallmentList: React.FC<Props> = ({
  installments,
  removeInstallment,
}) => {
  return (
    <ul className='flex  flex-col '>
      {installments.map((installment) => (
        <li key={installment.name}>
          <span className=' text-indigo-300'>
            {installment.name}
            {': '}
          </span>
          {currencyFormat(installment.monthlyCost)}
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeInstallment(installment.name)}
          >
            ⛔️
          </Button>
        </li>
      ))}
    </ul>
  );
};
