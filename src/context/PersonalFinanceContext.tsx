import React, { useEffect } from 'react';
import {
  calculateSubsMonthlyTotal,
  calculateSubsYearlyTotal,
} from '../lib/utils';

const initialFinances: PersonalFinance = {
  installmentList: {
    installments: [],
    monthlyTotal: 0,
  },
  subscriptionList: {
    subscriptions: [],
    monthlyTotal: 0,
    yearlyTotal: 0,
  },
  loanList: {
    loans: [],
    monthlyTotal: 0,
  },
};

const PersonalFinanceContext = React.createContext<{
  finances: PersonalFinance;
  setFinances: (newFinances: PersonalFinance) => void;
}>({
  finances: initialFinances,
  setFinances: () => {},
});

export function PersonalFinanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<PersonalFinance>(initialFinances);

  useEffect(() => {
    const financesInSessionStorage = localStorage.getItem('finances');
    if (financesInSessionStorage) {
      const finances: PersonalFinance = JSON.parse(
        financesInSessionStorage
      ) as PersonalFinance;
      const { installmentList, loanList, subscriptionList } = finances;

      setData({
        installmentList: {
          installments: installmentList.installments,
          monthlyTotal: installmentList.installments.reduce(
            (prev, curr) => prev + curr.monthlyCost,
            0
          ),
        },
        loanList: {
          loans: loanList.loans,
          monthlyTotal: loanList.loans.reduce(
            (prev, curr) => prev + curr.quantity,
            0
          ),
        },
        subscriptionList: {
          subscriptions: subscriptionList.subscriptions,
          monthlyTotal: calculateSubsMonthlyTotal(
            subscriptionList.subscriptions
          ),
          yearlyTotal: calculateSubsYearlyTotal(subscriptionList.subscriptions),
        },
      });
    }
  }, []);

  const _setData = React.useCallback((newFinances: PersonalFinance) => {
    setData(newFinances);
    localStorage.setItem('finances', JSON.stringify(newFinances));
  }, []);

  const value = {
    finances: data,
    setFinances: _setData,
  };

  return (
    <PersonalFinanceContext.Provider value={value}>
      {children}
    </PersonalFinanceContext.Provider>
  );
}

export function usePersonalFinance() {
  const context = React.useContext(PersonalFinanceContext);

  if (context === undefined) {
    throw new Error(
      'usePersonalFinance must be used within a PersonalFinanceProvider'
    );
  }

  return context;
}
