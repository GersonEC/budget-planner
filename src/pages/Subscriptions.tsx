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
import { SubscriptionList } from '../components/SubscriptionList';
import { Heading } from '../components/Heading';

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

  const handleRemove = (name: string) => {
    const newSubscriptions = subscriptions.filter((s) => s.name !== name);
    setSubscriptions(newSubscriptions);
    sessionStorage.setItem('subscriptions', JSON.stringify(newSubscriptions));
  };

  const addSubscription = (newSubscription: Subscription) => {
    const newSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(newSubscriptions);
    sessionStorage.setItem('subscriptions', JSON.stringify(newSubscriptions));
    setIsOpen(false);
  };

  return (
    <div>
      <Nav />
      <Heading variant='title'>Subscriptions</Heading>
      <Dialog open={isOpen}>
        <DialogTrigger
          className='hover:underline'
          onClick={() => setIsOpen(true)}
        >
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

      <SubscriptionList
        subscriptions={subscriptions}
        removeSubscription={handleRemove}
      />
    </div>
  );
};
