import { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { SubscriptionForm } from '../components/SubscriptionForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

export const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const subscriptionsInSessionStorage =
      sessionStorage.getItem('subscriptions');
    if (subscriptionsInSessionStorage) {
      setSubscriptions(JSON.parse(subscriptionsInSessionStorage));
    }
  }, []);

  const addSubscription = (newSubscription: Subscription) => {
    const newSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(newSubscriptions);
    sessionStorage.setItem('subscriptions', JSON.stringify(newSubscriptions));
    setIsOpen(false);
  };

  return (
    <div>
      <Nav />
      <h1>Subscription Page</h1>
      <Dialog open={isOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
          Add new subscription
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Subscription</DialogTitle>
            <DialogDescription>
              insert the data about your new subscription.
            </DialogDescription>
            <SubscriptionForm addSubscription={addSubscription} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.name}>{sub.name}</li>
        ))}
      </ul>
    </div>
  );
};
