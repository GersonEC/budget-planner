import { useState } from 'react';
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
import {
  calculateSubsMonthlyTotal,
  calculateSubsYearlyTotal,
} from '../lib/utils';
import { usePersonalFinance } from '../context/PersonalFinanceContext';

export const Subscriptions = () => {
  const { finances, setFinances } = usePersonalFinance();
  const subscriptions = finances.subscriptionList.subscriptions;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRemove = (name: string) => {
    const newSubscriptions = subscriptions.filter(
      (s: Subscription) => s.name !== name
    );
    const newFinances: PersonalFinance = {
      ...finances,
      subscriptionList: {
        subscriptions: newSubscriptions,
        monthlyTotal: calculateSubsMonthlyTotal(newSubscriptions),
        yearlyTotal: calculateSubsYearlyTotal(newSubscriptions),
      },
    };
    setFinances(newFinances);
  };

  const addSubscription = (newSubscription: Subscription) => {
    const newSubscriptions = [...subscriptions, newSubscription];
    const newFinances: PersonalFinance = {
      ...finances,
      subscriptionList: {
        subscriptions: newSubscriptions,
        monthlyTotal: calculateSubsMonthlyTotal(newSubscriptions),
        yearlyTotal: calculateSubsYearlyTotal(newSubscriptions),
      },
    };
    setFinances(newFinances);
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
