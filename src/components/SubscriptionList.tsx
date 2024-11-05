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
    <ul className='flex items-center gap-6 justify-center'>
      {subscriptions.map((subscription) => (
        <li key={subscription.name}>
          {subscription.name}{' '}
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
