import React, { useEffect } from 'react';
import {
  calculateSubsMonthlyTotal,
  calculateSubsYearlyTotal,
} from '../lib/utils';

const PersonalFinanceContext = React.createContext<
  | {
      finances: PersonalFinance;
      setFinances: (newFinances: PersonalFinance) => void;
    }
  | undefined
>(undefined);

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

export function PersonalFinanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<PersonalFinance>(initialFinances);

  useEffect(() => {
    const financesInSessionStorage = sessionStorage.getItem('finances');
    if (financesInSessionStorage) {
      const finances: PersonalFinance = JSON.parse(
        financesInSessionStorage
      ) as PersonalFinance;
      setData({
        installmentList: {} as InstallmentList,
        loanList: {} as LoanList,
        subscriptionList: {
          subscriptions: finances.subscriptionList.subscriptions,
          monthlyTotal: calculateSubsMonthlyTotal(
            finances.subscriptionList.subscriptions
          ),
          yearlyTotal: calculateSubsYearlyTotal(
            finances.subscriptionList.subscriptions
          ),
        },
      });
    }
  }, []);

  const _setData = React.useCallback((newFinances: PersonalFinance) => {
    setData(newFinances);
    sessionStorage.setItem('finances', JSON.stringify(newFinances));
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
