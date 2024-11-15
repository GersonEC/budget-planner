import { useState } from 'react';
import { SubscriptionForm } from '../components/SubscriptionForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { SubscriptionList } from '../components/SubscriptionList';
import { Heading } from '../components/Heading';
import {
  calculateSubsMonthlyTotal,
  calculateSubsYearlyTotal,
  currencyFormat,
} from '../lib/utils';
import { usePersonalFinance } from '../context/PersonalFinanceContext';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

export const Subscriptions = () => {
  const { toast } = useToast();
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
    toast({
      variant: 'success',
      title: 'Subscription removed successfully',
      description: `Subscription removed: ${name}`,
    });
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
    toast({
      variant: 'success',
      title: 'Subscription added successfully',
      description: `New subscription: ${newSubscription.name} - ${
        newSubscription.category
      } - ${currencyFormat(newSubscription.monthlyCost)}`,
    });
  };

  return (
    <div>
      <div className='flex  justify-between items-baseline'>
        <Heading variant='title'>Subscriptions</Heading>
        <Button variant={'secondary'} onClick={() => setIsOpen(true)}>
          Add new subscription
        </Button>
      </div>
      {/**TODO: Move subscription dialog into a separate component */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
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
