import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PieChartData } from '../components/CategoriesPieChart';
import { ChartConfig } from '../components/ui/chart';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
