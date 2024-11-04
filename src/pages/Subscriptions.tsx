import { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { SubscriptionForm } from '../components/SubscriptionForm';

export const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const subscriptionsInSessionStorage =
      sessionStorage.getItem('subscriptions');
    if (subscriptionsInSessionStorage) {
      setSubscriptions(subscriptions);
    }
  }, []);

  const addSubscription = (newSubscription: Subscription) => {
    setSubscriptions([...subscriptions, newSubscription]);
  };

  return (
    <div>
      <Nav />
      <h1>Subscription Page</h1>
      <SubscriptionForm addSubscription={addSubscription} />
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.name}>{sub.name}</li>
        ))}
      </ul>
    </div>
  );
};
