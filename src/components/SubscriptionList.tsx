import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

interface Props {
  subscriptions: Subscription[];
  removeSubscription: (name: string) => void;
}
export const SubscriptionList: React.FC<Props> = ({
  subscriptions,
  removeSubscription,
}) => {
  return (
    <ul className='flex flex-col'>
      {subscriptions.map((subscription) => (
        <li key={subscription.name}>
          <span className=' text-indigo-300'>
            {subscription.name}
            {': '}
          </span>
          {currencyFormat(subscription.monthlyCost)}
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeSubscription(subscription.name)}
          >
            ⛔️
          </Button>
        </li>
      ))}
    </ul>
  );
};
