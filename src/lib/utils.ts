import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PieChartData } from '../components/CategoriesPieChart';
import { ChartConfig } from '../components/ui/chart';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCapitalize(str: string) {
  const newString = str.toLowerCase();
  return newString[0].toUpperCase() + newString.slice(1);
}

export function currencyFormat(number: number) {
  const EURO = Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  const currency = EURO.format(number);
  return currency;
}

export const chartConfig = {
  name: {
    label: 'name',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const createPieChartDataFromCategory = (category: CategoryForm) => {
  const data: PieChartData = {
    name: category.name,
    value: Number(category.budget),
  };
  return data;
};

export const calculateSubsMonthlyTotal = (
  subscriptions: Subscription[] = []
) => {
  return subscriptions.reduce(
    (prevValue, currValue) => prevValue + currValue.monthlyCost,
    0
  );
};

export const calculateSubsYearlyTotal = (
  subscriptions: Subscription[] = []
) => {
  return subscriptions.reduce(
    (prevValue, currValue) => prevValue + currValue.yearlyCost,
    0
  );
};

type SubscriptionCharData = {
  name: string;
  value: number;
};
export const buildSubscriptionsCategoryCharData = (
  subscriptions: Subscription[] = []
): SubscriptionCharData[] => {
  const subsGroupByCategory = subscriptions.map((sub) => {
    return {
      name: sub.category,
      value: sub.monthlyCost,
    };
  });
  const subsCategoryData: SubscriptionCharData[] = [];
  subsGroupByCategory.forEach((obj) => {
    const isNameAlreadyIn = subsCategoryData.find(
      (sub) => sub.name === obj.name
    );
    if (Boolean(isNameAlreadyIn) === false) {
      subsCategoryData.push(obj);
    } else {
      const index = subsCategoryData.findIndex((sub) => sub.name === obj.name);
      subsCategoryData[index].value += obj.value;
    }
  });
  return subsCategoryData;
};

export const buildSubscriptionsNameCharData = (
  subscriptions: Subscription[] = []
): SubscriptionCharData[] => {
  let response: SubscriptionCharData[] = [];
  response = subscriptions.map((sub) => ({
    name: sub.name,
    value: sub.monthlyCost,
  }));

  return response;
};

export const getCurrentMonthInString = () => {
  const today = new Date();
  return today.toLocaleString('default', { month: 'long' });
};

export const hasMonthChanged = (month: number): boolean => {
  const today = new Date();
  return today.getMonth() !== month;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepObjectEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepObjectEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const calculateTotalFlow = (flows: Flow[]) => {
  return flows.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );
};

export const updateOutflows = (
  monthlyBudget: MonthlyBudget,
  newOutflows: Flow[]
) => {
  const updatedMonthlyBudgetBills: MonthlyBudget = {
    ...monthlyBudget,
    cashflow: {
      ...monthlyBudget.cashflow,
      outflow: {
        ...monthlyBudget.cashflow.outflow,
        flows: newOutflows,
        totalFlow: calculateTotalFlow(newOutflows),
      },
    },
  };
  return updatedMonthlyBudgetBills;
};
